Deploy URL: https://week-10-react-assessment.vercel.app/

1. Explain how and why you divided the app’s UI into components,

The reason divide into components is because of cleaniness and easy to read also each components can also be reuse able.

Layout will show navbar that can link to /home and /owner
Page: /home /owner
Home: UserTable, Admin

2. What state variables did you created and why?

useState: use when need to change from User to Admin
and also store the array of member data that fetch from the API
Need to use because we want to change the UI while not changing the page URL
Click User = setActiveSection('user')
Click Admin = setActiveSection('admin')

and use if or && to set condition to shown which table

3. How did you manage these states? Was it via Passing Props or React Context, why?
   Using Passing Props because we only have home that need to send members into User or Admin

Also we can see clearly in the code that members have been pass from home to table

Context is good with big scale like deep nesting project or global scope

4. Explain how and why you used the useEffect hook?

   The reason why we not writing only fetch() because it will cause an infinite loop.

Why infinite loop?
because we will store the data in useState and how useState work is it will tell React to re-render everytime that data change. So when re-render again and the code run fetch again it will course the browser to be frozen!

useEffect come to help this because it allow us to control that which time that function will run in the second Parameter of useEffect(..., []).

The first parameter is what function we want to control and the second parameter is the controller which we set as [] mean it will only run FIRST TIME when the browser finish loading

5. Explain whether you could and why, you would use fetch() without using useEffect?

Just open the web: We could use fetch() without useEffect by that will cause infinite loop because when we use useState to store the data when we open the browser it will re-render and react will read the code again and the fetch() code will keep running infinitely so in this case I will use useEffect to avoid that problem.

Event: on the other hand in the case that it will no cause infinite loop is when we set fetch as trigger action like onClick => fetch() because this kind of function only active once we click so the render of the page is not effecting this kind of situation

6.Explain whether the use of fetch() should be synchronous or asynchronous JavaScript, why?

it is asynchronous JavaScript because it is function that need to wait for data from other server if we run synchronus the browser need to wait and browser will freeze for sure. But using async await will allow browser to keep running the code and handle the data when it was ready. Where as synchronus JaveScript is runing line by line and active the that code at that time .

7. Include any other notes about React and Frontend Web Development you want to use to summarize your understanding of this technical domain . You can also note down questions you have.

Use tailwind css: for styling no need to switch file around.

Use Router: for best UX for changing the pages around with single page application very fast

Components base: make the code clean organize and easy to read and develop

Question: if API is not working what could been shown on the screen?
