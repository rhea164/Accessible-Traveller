# Accessible-Mapper
Built for the Katy Youth Hackathon Summer 2024. 

Watch the demo video : https://www.youtube.com/watch?v=2zwleuLEn3I&t=88s&ab_channel=BrateePodder <br>
Website: https://accessible-traveller.vercel.app/

<a href="https://accessible-traveller.vercel.app/"><img src="/thumbnail.png" />

## **Inspiration**
The idea for Accessible Mapper was inspired by the need to improve accessibility for people with disabilities or specific location preferences. 

While planning our initial accessibility vacation planner application, we realized how difficult it was to find accurate and detailed information about the accessibility features of various locations. This gap in the web inspired us to create a platform that provides a comprehensive, user-contributed database of accessibility information. We were particularly motivated by the story of a young girl who, during her travels, created an open bathroom map to help others find accessible restrooms. Her initiative highlighted the power of community-driven solutions, and we wanted to create something similar for accessibility needs.

## **What We Learned**
Throughout the development of Accessible Mapper, we learned a great deal about the challenges faced by people with disabilities and how small details, like noise levels or the availability of ramps, can significantly impact their experience. We also gained insights into user experience (UX) design, particularly the importance of creating an intuitive interface that allows users to easily contribute and search for information. Additionally, we deepened our understanding of technologies like image recognition and geolocation services, which are critical components of our application.

## **How We Built the Project**
We started by brainstorming the core features of the application and identifying the technologies needed to bring them to life. The front end was built using React for a seamless experience, while the back end was powered by a Flask server, which handles the data processing and communication between the app and the  database. We implemented a search functionality that allows users to filter locations based on specific accessibility features, and integrated an image upload feature to ensure that all claims are backed by visual proof. The application is supported by a robust Mongo DB database that stores user-contributed data, including tags, images, and reviews.

## **Challenges We Faced**
One of the biggest challenges  was creating a search algorithm that could efficiently filter through the database based on multiple criteria, such as noise levels, brightness, and accessibility features. Balancing the need for detailed information with the simplicity of the user interface was also a critical challenge, as we wanted to make the app accessible to all users, regardless of their technical proficiency.



