# aqi-prediction
Repository for SEM-6 project of AQI Prediction using the Prophet Model.

Backend folder me server.py karke file hai pehle usko run karna padega
Command for that : 
uvicorn server:app --host 0.0.0.0 --port 8000 --reload

Backend successfully run kar raha aur predictions generate ho rahe hai ye check karne ke liye,next ye web address pe visit karna , agar predictions dikh rahe hai toh backend chal rha hai
http://127.0.0.1:8000/predict?city=Mumbai

Frontend ke liye : npm run dev
Tailwind use karne ke liye configure kiya hai,work kar rha hai kya dekh lo
Fronend ka main code Trial.jsx file me hai

