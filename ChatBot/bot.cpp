#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

class Avengers {
public:
    Avengers() {
        // Initialize some basic responses
        responses["hi"] = "Hello! I'm one of the Avengers.";
        responses["hello"] = "Hi there! Avenger at your service.";
        responses["how are you"] = "We're always ready to save the world!";
        responses["what's your name"] = "We are the Avengers";
        responses["bye"] = "Goodbye! Stay safe, citizen!";
    }

    void startChat() {
        string userInput;
        string userName;

        // Start with a welcoming message
        cout << "Welcome, citizen! What's your name?\n";
        cout << "You: ";
        getline(cin, userName);

        cout << "Hello " << userName << "! How may we assist you today?\n";

        // Display options
        cout << "Please select an option:\n";
        cout << "1. Ticket Booking\n";
        cout << "2. Previous Booking Enquiry\n";
        cout << "3. Ticket Cancellation\n";
        cout << "4. Any Other Queries\n";


        while (true) {
            cout << "You: ";
            getline(cin, userInput);

            // Convert user input to lowercase
            string lowerInput = toLower(userInput);

            // Check if user wants to exit
            if (lowerInput == "bye") {
                cout << responses["bye"] << endl;
                break;
            }

            // Handle ticket booking process
            if (lowerInput == "1") {
                bookTickets();
            } else if (responses.find(lowerInput) != responses.end()) {
                cout << responses[lowerInput] << endl;
            } else {
                cout << "Sorry, I didn't understand that." << endl;
            }
        }
    }

private:
    unordered_map<string, string> responses;

    string toLower(const string& str) {
        string result = str;
        for (char& c : result) {
            c = tolower(c);
        }
        return result;
    }

    void bookTickets() {
        string name, gender, response;
        int age;

        do {
            // Ask for user details
            cout << "Please enter your full name:\n";
            cout << "You: ";
            getline(cin, name);

            cout << "Please enter your age:\n";
            cout << "You: ";
            cin >> age;
            cin.ignore();  // Ignore the newline character left in the input buffer

            cout << "Please enter your gender (M/F):\n";
            cout << "You: ";
            getline(cin, gender);

            cout << "Would you like to add another family member for booking? (Y/N):\n";
            cout << "You: ";
            getline(cin, response);

        } while (response == "Y" || response == "y");

        // After taking details, proceed to select the museum
        cout << "Please select the museum you want to visit:\n";
        cout << "1. Avengers\n";
        cout << "2. IRON MAN\n";
        cout << "3. CAPTAIN AMERICA\n";
        // Add more options as needed

        string museumChoice;
        cout << "You: ";
        getline(cin, museumChoice);

        cout << "Thank you for booking with us! Your tickets will be processed shortly.\n";
    }
};

int main() {
    Avengers avengers;
    avengers.startChat();
    return 0;
}
