# contacts_shop
This is just a simple web application that I wrote for a client-side scripting course in college, which I have decided to revisit and update.  The web application will allow for a customer to purchase (well, *not really*) contacts through an online store.

Originally, this was just a simple HTML page tied to some simple JavaScript (which I later updated to use the jQuery library). Coming back to this application years later, I was a bit uncomfortable with the quality of the code that I had originally written. Now, this application contains an improved HTML and vanilla JavaScript front-end, which connects to a Python backend that utilizes the FastAPI framework.  

The currently implemented/planned code improvements to this application are:  
- [x] Improved HTML formatting
- [ ] Improved JavaScript formatting
- [ ] Corrected HTML to meet HTML best practice standards (included accessibility improvements)
- [ ] Corrected JavaScript to meet JavaScript best practice standards
- [ ] Improve CSS so that site has a UI that has a more professional appearance
- [x] Create FastAPI backend
- [ ] Store data in a database, instead of static data contained within code
- [ ] Update JavaScript to use the Svelte framework
- [ ] Change CSS to work with a modern CSS framework (such as Tailwind CSS)
- [ ] Update website architecture to resemble a modern web store
- [ ] Add unit tests

# Installation
Prequisites: Python 3.9.1
```
pip install -r requirements.txt
uvicorn main:app --reload
```