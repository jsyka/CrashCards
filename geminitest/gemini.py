import google.generativeai as genai
import os, json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel('gemini-1.5-flash')

notes = """DNA replication is a fundamental process that occurs in all living organisms, ensuring that each new cell receives an exact copy of the organism’s genetic material. The process begins at specific locations on the DNA molecule called origins of replication, where the two strands of the DNA double helix are separated by the enzyme helicase. This separation creates a replication fork, which provides the template for the synthesis of new DNA strands. Each strand of the original DNA serves as a template for the formation of a new complementary strand, a process guided by the enzyme DNA polymerase. DNA polymerase adds nucleotides to the growing DNA strand in a 5' to 3' direction, matching each nucleotide with its complementary base on the template strand (A with T, and G with C).
Replication is semi-conservative, meaning that each new DNA molecule consists of one original strand and one newly synthesized strand. This process ensures genetic continuity between generations of cells. However, the process is not flawless; sometimes, errors occur, leading to mutations. Proofreading mechanisms are in place to correct most errors, but some mutations may persist, potentially leading to genetic disorders or contributing to evolutionary changes. DNA replication is tightly regulated to occur only once per cell cycle, ensuring that cells maintain the correct number of chromosomes. This process is crucial not only for growth and development but also for the repair of damaged tissues and the maintenance of healthy cell function."""

def generateCards(notes):
    response = model.generate_content("Create 10 flashcards in a JSON format based off these notes: " + notes)
    print(response.text)
    response = json.loads(response[7:-3])
    print(response)
    return response

# generateCards(notes)