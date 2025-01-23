#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

// Function to convert a list of words into the desired format
std::string convertToListFormat(const std::vector<std::string>& words) {
    std::ostringstream oss;
    oss << "[";

    for (size_t i = 0; i < words.size(); ++i) {
        oss << "\"" << words[i] << "\"";
        if (i < words.size() - 1) {
            oss << ", ";
        }
    }

    oss << "]";
    return oss.str();
}

int main() {
    std::ifstream inputFile("guesses.txt"); // File containing the list of words
    std::ofstream outputFile("output2.txt"); // File to store the converted list

    if (!inputFile.is_open()) {
        std::cerr << "Error: Unable to open input file." << std::endl;
        return 1;
    }

    std::vector<std::string> words;
    std::string word;

    // Read words from the input file
    while (std::getline(inputFile, word)) {
        if (!word.empty()) {
            words.push_back(word);
        }
    }

    inputFile.close();

    // Convert words to the desired format
    std::string formattedList = convertToListFormat(words);

    // Write the formatted list to the output file
    if (outputFile.is_open()) {
        outputFile << formattedList;
        outputFile.close();
    } else {
        std::cerr << "Error: Unable to open output file." << std::endl;
        return 1;
    }

    std::cout << "Conversion completed. Check 'output.txt' for results." << std::endl;
    return 0;
}
