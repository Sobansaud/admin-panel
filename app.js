import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { database } from './FirebaseConfig';

const App = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        // Fetch images from Firebase
        const fetchImages = async () => {
            const imagesRef = database.ref('images');
            imagesRef.on('value', (snapshot) => {
                const data = snapshot.val();
                // Process data (e.g., update state to display images in a carousel)
            });
        };

        fetchImages();
    }, []);

    return (
        <View>
            <Text>Welcome to the Mobile App!</Text>
            {/* Add your carousel and other components here */}
        </View>
    );
};

export default App;













// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

async function uploadImages() {
    const files = document.getElementById('imageUpload').files;
    const storageRef = storage.ref();
    
    for (const file of files) {
        const fileRef = storageRef.child(`images/${file.name}`);
        await fileRef.put(file);
        
        const url = await fileRef.getDownloadURL();
        await database.ref('images').push({ url });
    }
    alert("Images uploaded successfully!");
}

function sendNotification(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const carId = document.getElementById('carId').value;

    // Trigger push notification (implement your API call here)
    fetch('YOUR_PUSH_NOTIFICATION_API', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, carId }),
    })
    .then(response => response.json())
    .then(data => {
        alert("Notification sent!");
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
