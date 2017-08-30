from textgenrnn import textgenrnn

textgen = textgenrnn()

def generateText():
  return textgen.generate(1, True)
  
