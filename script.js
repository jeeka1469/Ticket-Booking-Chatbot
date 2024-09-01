class Avengers {
    constructor() {
        // Initialize some basic responses in a hashmap for easy lookup
        this.responses = {
            "hi": "Hello! I'm one of the Avengers.",
            "hello": "Hi there! Avenger at your service.",
            "how are you": "We're always ready to save the world!",
            "what's your name": "We are the Avengers.",
            "bye": "Goodbye! Stay safe, citizen!",
            "thanks": "You're welcome! Have a great day!"
        };

        // Initialize museum options
        this.museums = {
            "1": "Avengers",
            "2": "IRON MAN",
            "3": "CAPTAIN AMERICA"
        };

        // Load dataset from local storage
        this.loadDataset();

        // Initialize chat box
        this.chatBox = document.getElementById('chat-box');
        this.userName = "";
        this.userAge = "";
        this.userGender = "";
        this.userMuseum = "";
        this.step = "askName";  // Track the state of the conversation
    }

    // Function to add a message to the chat box
    addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        messageElement.textContent = message;
        this.chatBox.appendChild(messageElement);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;  // Scroll to bottom
    }

    // Function to handle sending a message
    sendMessage(userInput) {
        userInput = userInput.trim();
        if (userInput === "") return;

        this.addMessage('user', userInput);

        switch (this.step) {
            case "askName":
                this.userName = userInput;
                this.step = "askAge";
                this.addMessage('bot', `Thank you, ${this.userName}. How old are you?`);
                break;

            case "askAge":
                this.userAge = userInput;
                this.step = "askGender";
                this.addMessage('bot', `Got it. What is your gender (M/F)?`);
                break;

            case "askGender":
                this.userGender = userInput;
                this.step = "showOptions";
                this.addMessage('bot', `Thank you! How may we assist you today, ${this.userName}?`);
                this.addMessage('bot', "Please select an option:\n1. Ticket Booking\n2. Previous Booking Enquiry\n3. Ticket Cancellation\n4. Any Other Queries");
                break;

            case "showOptions":
                this.handleOptions(userInput);
                break;

            case "bookTickets":
                this.userMuseum = this.museums[userInput] || "Unknown";
                this.step = "confirmBooking";
                this.confirmBooking();
                break;

            case "processPayment":
                // Payment processing logic
                this.addMessage('bot', "Payment successful! Thank you for your purchase.");
                this.step = "askHelp";
                this.askForFurtherHelp();
                break;

            case "askHelp":
                if (userInput.toLowerCase() === "bye" || userInput.toLowerCase() === "thanks") {
                    this.addMessage('bot', this.responses[userInput.toLowerCase()]);
                    this.resetUserData();
                    this.step = "askName";  // Reset to initial state
                } else {
                    this.step = "showOptions";
                    this.addMessage('bot', "Please select an option:\n1. Ticket Booking\n2. Previous Booking Enquiry\n3. Ticket Cancellation\n4. Any Other Queries\nOr type 'bye' or 'thanks' to end the chat.");
                }
                break;

            case "previousBookingEnquiry":
                this.previousBookingEnquiry();
                break;

            case "cancelTicket":
                this.cancelTicket();
                break;

            case "handleOtherQueries":
                this.handleOtherQueries();
                break;

            default:
                if (this.responses[userInput.toLowerCase()]) {
                    this.addMessage('bot', this.responses[userInput.toLowerCase()]);
                } else {
                    this.addMessage('bot', "Sorry, I didn't understand that.");
                }
                break;
        }
    }

    // Function to handle options based on user input
    handleOptions(userInput) {
        const lowerInput = userInput.toLowerCase();

        if (lowerInput === "1") {
            this.step = "bookTickets";
            this.addMessage('bot', "Please select the museum you want to visit:\n1. Avengers\n2. IRON MAN\n3. CAPTAIN AMERICA");
        } else if (lowerInput === "2") {
            this.step = "previousBookingEnquiry";
            this.previousBookingEnquiry();
        } else if (lowerInput === "3") {
            this.step = "cancelTicket";
            this.cancelTicket();
        } else if (lowerInput === "4") {
            this.step = "handleOtherQueries";
            this.handleOtherQueries();
        } else {
            this.addMessage('bot', "Sorry, I didn't understand that.");
        }
    }

    // Function to confirm and save booking details
    confirmBooking() {
        const referenceNumber = this.generateReference();  // Generate a reference number
        this.dataset.push({
            reference: referenceNumber,
            name: this.userName,
            age: this.userAge,
            gender: this.userGender,
            museum: this.userMuseum
        });
        this.saveDataset();  // Save updated dataset to local storage

        // Print the booking details including the reference number
        this.addMessage('bot', `Thank you, ${this.userName}! Your booking details are:\nReference: ${referenceNumber}\nName: ${this.userName}\nAge: ${this.userAge}\nGender: ${this.userGender}\nMuseum: ${this.userMuseum}\n`);
        this.addMessage('bot', "Your tickets will be processed shortly.");
        this.resetUserData();  // Reset user data for the next interaction
        this.step = "askHelp";
        this.askForFurtherHelp();
    }

    // Function to generate a random reference number
    generateReference() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    // Function to save dataset to local storage
    saveDataset() {
        localStorage.setItem('dataset', JSON.stringify(this.dataset));
    }

    // Function to load dataset from local storage
    loadDataset() {
        const storedDataset = localStorage.getItem('dataset');
        if (storedDataset) {
            this.dataset = JSON.parse(storedDataset);
        } else {
            this.dataset = [];  // Initialize an empty array if no dataset is found
        }
    }

    // Function to handle previous booking enquiries
    previousBookingEnquiry() {
        this.addMessage('bot', "Please enter your booking reference number:");
        const reference = prompt("Enter reference number:");  // For simulation purposes
        const booking = this.dataset.find(entry => entry.reference === reference);

        if (booking) {
            this.addMessage('bot', `Booking Details:\nReference: ${booking.reference}\nName: ${booking.name}\nMuseum: ${booking.museum}\nDate: 01/09/2024\nNumber of Tickets: 3\nTotal Price: $75\nThank you for using our service!`);
        } else {
            this.addMessage('bot', "No booking found with that reference number.");
        }
    }

    // Function to handle ticket cancellation
    cancelTicket() {
        this.addMessage('bot', "Please enter your booking reference number for cancellation:");
        const reference = prompt("Enter reference number:");  // For simulation purposes
        const bookingIndex = this.dataset.findIndex(entry => entry.reference === reference);

        if (bookingIndex > -1) {
            this.dataset.splice(bookingIndex, 1);  // Remove booking from dataset
            this.saveDataset();  // Save updated dataset to local storage
            this.addMessage('bot', `Your booking with reference ${reference} has been successfully cancelled.\nYou will receive a refund within 5-7 business days.\nThank you for using our service!`);
        } else {
            this.addMessage('bot', "No booking found with that reference number.");
        }
    }

    // Function to handle other queries from the user
    handleOtherQueries() {
        this.addMessage('bot', "Please enter your query or concern:");
        this.addMessage('bot', "Thank you for reaching out! We have noted your query: \"[QUERY]\"\nOur support team will get back to you shortly. Have a great day!");
    }

    // Function to ask if the user needs further assistance
    askForFurtherHelp() {
        this.addMessage('bot', "Is there anything else I can assist you with?\nPlease select an option:\n1. Ticket Booking\n2. Previous Booking Enquiry\n3. Ticket Cancellation\n4. Any Other Queries\nOr type 'bye' or 'thanks' to end the chat.");
        this.step = "askHelp";
    }

    // Function to reset user data for a new interaction
    resetUserData() {
        this.userName = "";
        this.userAge = "";
        this.userGender = "";
        this.userMuseum = "";
    }
}

const avengers = new Avengers();

// Function to send a message
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    document.getElementById('user-input').value = "";
    avengers.sendMessage(userInput);
}

// Add event listener to handle Enter key press
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();  // Prevent default Enter key action
        sendMessage();
    }
});
