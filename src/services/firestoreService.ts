import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';

export const getHomeContent = async () => {
  const docRef = doc(db, 'home_content', 'main');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const getAboutContent = async () => {
  const docRef = doc(db, 'about_page', 'content');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const getTeamMembers = async () => {
  const q = query(collection(db, 'team_members'), orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getVideos = async () => {
  const querySnapshot = await getDocs(collection(db, 'videos'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getContactInfo = async () => {
  const docRef = doc(db, 'contact_info', 'details');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Real-time hooks would be better in components, but these are helpers for non-hook situations if needed.
