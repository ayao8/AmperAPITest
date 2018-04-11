# Amper API Test App

Simple React Native App to test Amper Music (AI music composition startup) API: https://docs.ampermusic.com/jimmy/

The app starts by sending a GET request to API to get a list of all the types of music that Amper can currently compose to be displayed.

The app then has 3 buttons:
1. First button sends a POST request (including an authentication token), that requests Amper to compose a "Happy Modern Folk" song.
2. Second button sends a GET request to see the status of the song composition. Based on the response, the app will display whether or not the composition is complete. 
3. Third button sends a GET request to actually retrieve the song. This request returns a blob (mp3 file) and is yet to be dealt with. 


