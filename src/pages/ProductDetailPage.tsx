import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_DATA } from '../constants';
import { motion } from 'motion/react';

import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // 1. Check local data first
    const localProduct = PRODUCTS_DATA.find(p => p.slug === productId);
    
    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
    } else if (productId) {
      // 2. If not found in local data, check Firestore
      const fetchProduct = async () => {
        setLoading(true);
        const path = `products`;
        try {
          const q = query(collection(db, 'products'), where('slug', '==', productId));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setProduct({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
          } else {
            setProduct(null);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, path);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
      return <div className="pt-24 text-center py-20 text-white">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="pt-24 text-center py-20">
        <h1 className="text-4xl font-bold text-white">Product not found</h1>
        <Link to="/products" className="mt-4 inline-block text-green-400 hover:underline">
          &larr; Back to all products
        </Link>
      </div>
    );
  }

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'grid':
        return (
          <div key={index} className="grid md:grid-cols-2 gap-8">
            {section.items.map((item: { title: string, text: string }, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500/30 transition-colors"
              >
                <h4 className="text-xl font-bold text-green-400 mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        );
      case 'list':
        return (
          <ul key={index} className="space-y-3 list-none">
            {section.items.map((item: string, i: number) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center space-x-3 text-gray-400"
              >
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        );
      case 'list-tick':
        return (
            <ul key={index} className="space-y-4">
                {section.items.map((item: string, i: number) => (
                    <motion.li 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start"
                    >
                        <div className="bg-green-500/10 p-1 rounded mr-3 mt-1">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-lg">{item}</span>
                    </motion.li>
                ))}
            </ul>
        );
      case 'numbered-list':
        return (
          <div key={index} className="space-y-8">
            {section.items.map((item: { title: string, text: string }, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl flex items-center justify-center font-bold text-xl mr-6 transition-all group-hover:bg-green-500 group-hover:text-white group-hover:scale-110 duration-500">{i + 1}</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{item.title}</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      default:
        return (
            <motion.p 
                key={index} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-300 text-lg leading-relaxed max-w-none"
            >
                {section.content}
            </motion.p>
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      <motion.section 
        className="py-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{product.title}</h1>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mb-6"></div>
            <p className="text-md font-semibold tracking-widest text-gray-400 mb-4 uppercase">Vishwa Aadhar Enterprises</p>
            <p className="text-xl text-green-400 max-w-3xl mx-auto font-medium">{product.details.tagline}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img src={product.details.mainImage} alt={product.title} className="relative w-full h-auto max-h-[600px] object-cover rounded-2xl shadow-2xl mb-16 border border-gray-800" />
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-16">
            {product.details.sections.map((section: any, index: number) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 to-transparent hidden md:block"></div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <span className="text-green-500 mr-4 font-mono text-xl opacity-50">0{index + 1}</span>
                    {section.title}
                  </h3>
                  <div className="transition-all duration-700">
                    {renderSection(section, index)}
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
                variants={itemVariants} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center pt-8"
            >
                 <Link to="/products" className="inline-flex items-center space-x-2 bg-gray-800 border border-gray-700 text-white font-bold py-4 px-10 rounded-full hover:bg-gray-700 hover:border-green-500 transition-all duration-300 group">
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                    <span>Back to All Innovations</span>
                </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProductDetailPage;
