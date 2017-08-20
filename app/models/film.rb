class Film < Product
  enum category: [:Television, :"Children's & Family", :Drama, :"Action & Adventure", :"World Cinema",
                  :Horror, :"Science Fiction", :Comedy, :Documentary, :Thriller, :Western, :"Animated Feature",
                  :Anime, :"Modern Classic", :Musicals, :Sport]

  enum format: [:DVD, :"DVD Box Set", :"Blu-ray"]
end
