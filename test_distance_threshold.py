vocab_file ="/path/to/vocab_file"
vectors_file ="/path/to/vectors_file"

embed = Embedding(vocab_file,vectors_file)

cuisine_refs = ["mexican","chinese","french","british","american"]
threshold = 0.2

text = "I want to find an indian restaurant"

cuisines = find_similar_words(embed,cuisine_refs,text,threshold)
print(cuisines)