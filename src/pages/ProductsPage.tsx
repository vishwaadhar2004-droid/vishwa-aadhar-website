import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { PRODUCTS_DATA } from '../constants';

import { db } from '../firebase';
import { collection, onSnapshot, query, doc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const ProductsPage: React.FC = () => {
  const [dbProducts, setDbProducts] = React.useState<any[]>([]);
  const [header, setHeader] = React.useState<any>(null);

  React.useEffect(() => {
    const headerPath = 'products_page/content';
    const unsubHeader = onSnapshot(doc(db, 'products_page', 'content'), (doc) => {
        if (doc.exists()) setHeader(doc.data());
    });

    const path = 'products';
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      setDbProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
    return () => {
        unsub();
        unsubHeader();
    };
  }, []);

  const allProducts = [...PRODUCTS_DATA, ...dbProducts.filter(p => !PRODUCTS_DATA.some(dp => dp.slug === p.slug))];

  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{header?.title || "Our Sustainable Products"}</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {header?.description || "Discover our innovative range of eco-friendly products, engineered to create a positive impact on the environment and society."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product, index) => (
              <AnimatedSection key={product.slug} delay={500 + index * 100}>
                <Link to={`/products/${product.slug}`} className="block h-full">
                  <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
                    <div className="relative">
                      <img src={product.cardImage} alt={product.title} className="w-full h-56 object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{product.title}</h2>
                      <p className="text-gray-400 mb-4 flex-grow">{product.shortDescription}</p>
                      <span className="font-semibold text-green-500 mt-auto">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
