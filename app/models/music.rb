class Music < Product
    enum category: [:"Rock & Pop", :Classical, :"Rock & Roll", :Blues, :"R&B & Soul", :Metal, :Dance,
                    :"Easy Listening", :Country, :Jazz, :"Rock Pop", :Folk, :"Rap & Hip-Hop", :Reggae,
                    :"Rock&Roll", :Soundtracks, :"Spoken Word"]

    enum format: [:"CD Box Set", :"CD Album", :"Vinyl 12\" Box Set", :"Vinyl 12\" Album", :"CD/DVD Album",
                  :"7\" Vinyl Single Box Set", :"12\" Vinyl/CD Album", :"CD/Blu-ray Album", :"CD/DVD/Blu-ray Album",
                  :"12\" Vinyl Single", :"12\" Vinyl/DVD Album", :CD, :"SACD/DVD Album", :Vinyl]
end
