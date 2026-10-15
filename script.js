import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC22SGAPMvHMyIomWJL8s9ckzFCUGGxYFc",
  authDomain: "cashcash-70c4f.firebaseapp.com",
  projectId: "cashcash-70c4f",
  storageBucket: "cashcash-70c4f.firebasestorage.app",
  messagingSenderId: "558530465357",
  appId: "1:558530465357:web:79addaada6e233ad689604"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("CASHCASH Firebase'e bağlandı!");

onSnapshot(doc(db, "config", "system"), (doc) => {
    const data = doc.data();
    if (data && data.dome_fill_percentage !== undefined) {
        const progressBar = document.querySelector('.progress');
        if (progressBar) progressBar.style.width = data.dome_fill_percentage + '%';
        
        if (data.competition_end_date) {
            const end = data.competition_end_date.toDate();
            const diff = end - new Date();
            if (diff > 0) {
                const days = Math.floor(diff / (1000*60*60*24));
                const hours = Math.floor((diff / (1000*60*60)) % 24);
                const el = document.getElementById('countdown');
                if(el) el.innerText = `${days} GÜN ${hours} SAAT`;
            }
        }
    }
});
