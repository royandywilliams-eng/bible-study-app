import type { BibleBook, Testament } from '../types/bible';

// Sample Bible data structure
// In a real app, this would be loaded from a file or server
const BIBLE_BOOKS_METADATA: Array<{
  testament: Testament;
  bookNumber: number;
  bookName: string;
  totalChapters: number;
}> = [
  // Old Testament (39 books)
  { testament: 'OT', bookNumber: 1, bookName: 'Genesis', totalChapters: 50 },
  { testament: 'OT', bookNumber: 2, bookName: 'Exodus', totalChapters: 40 },
  { testament: 'OT', bookNumber: 3, bookName: 'Leviticus', totalChapters: 27 },
  { testament: 'OT', bookNumber: 4, bookName: 'Numbers', totalChapters: 36 },
  { testament: 'OT', bookNumber: 5, bookName: 'Deuteronomy', totalChapters: 34 },
  { testament: 'OT', bookNumber: 6, bookName: 'Joshua', totalChapters: 24 },
  { testament: 'OT', bookNumber: 7, bookName: 'Judges', totalChapters: 21 },
  { testament: 'OT', bookNumber: 8, bookName: 'Ruth', totalChapters: 4 },
  { testament: 'OT', bookNumber: 9, bookName: '1 Samuel', totalChapters: 31 },
  { testament: 'OT', bookNumber: 10, bookName: '2 Samuel', totalChapters: 24 },
  { testament: 'OT', bookNumber: 11, bookName: '1 Kings', totalChapters: 22 },
  { testament: 'OT', bookNumber: 12, bookName: '2 Kings', totalChapters: 25 },
  { testament: 'OT', bookNumber: 13, bookName: '1 Chronicles', totalChapters: 29 },
  { testament: 'OT', bookNumber: 14, bookName: '2 Chronicles', totalChapters: 36 },
  { testament: 'OT', bookNumber: 15, bookName: 'Ezra', totalChapters: 10 },
  { testament: 'OT', bookNumber: 16, bookName: 'Nehemiah', totalChapters: 13 },
  { testament: 'OT', bookNumber: 17, bookName: 'Esther', totalChapters: 10 },
  { testament: 'OT', bookNumber: 18, bookName: 'Job', totalChapters: 42 },
  { testament: 'OT', bookNumber: 19, bookName: 'Psalms', totalChapters: 150 },
  { testament: 'OT', bookNumber: 20, bookName: 'Proverbs', totalChapters: 31 },
  { testament: 'OT', bookNumber: 21, bookName: 'Ecclesiastes', totalChapters: 12 },
  { testament: 'OT', bookNumber: 22, bookName: 'Isaiah', totalChapters: 66 },
  { testament: 'OT', bookNumber: 23, bookName: 'Jeremiah', totalChapters: 52 },
  { testament: 'OT', bookNumber: 24, bookName: 'Lamentations', totalChapters: 5 },
  { testament: 'OT', bookNumber: 25, bookName: 'Ezekiel', totalChapters: 48 },
  { testament: 'OT', bookNumber: 26, bookName: 'Daniel', totalChapters: 12 },
  { testament: 'OT', bookNumber: 27, bookName: 'Hosea', totalChapters: 14 },
  { testament: 'OT', bookNumber: 28, bookName: 'Joel', totalChapters: 3 },
  { testament: 'OT', bookNumber: 29, bookName: 'Amos', totalChapters: 9 },
  { testament: 'OT', bookNumber: 30, bookName: 'Obadiah', totalChapters: 1 },
  { testament: 'OT', bookNumber: 31, bookName: 'Jonah', totalChapters: 4 },
  { testament: 'OT', bookNumber: 32, bookName: 'Micah', totalChapters: 7 },
  { testament: 'OT', bookNumber: 33, bookName: 'Nahum', totalChapters: 3 },
  { testament: 'OT', bookNumber: 34, bookName: 'Habakkuk', totalChapters: 3 },
  { testament: 'OT', bookNumber: 35, bookName: 'Zephaniah', totalChapters: 3 },
  { testament: 'OT', bookNumber: 36, bookName: 'Haggai', totalChapters: 2 },
  { testament: 'OT', bookNumber: 37, bookName: 'Zechariah', totalChapters: 14 },
  { testament: 'OT', bookNumber: 38, bookName: 'Malachi', totalChapters: 4 },

  // New Testament (27 books)
  { testament: 'NT', bookNumber: 1, bookName: 'Matthew', totalChapters: 28 },
  { testament: 'NT', bookNumber: 2, bookName: 'Mark', totalChapters: 16 },
  { testament: 'NT', bookNumber: 3, bookName: 'Luke', totalChapters: 24 },
  { testament: 'NT', bookNumber: 4, bookName: 'John', totalChapters: 21 },
  { testament: 'NT', bookNumber: 5, bookName: 'Acts', totalChapters: 28 },
  { testament: 'NT', bookNumber: 6, bookName: 'Romans', totalChapters: 16 },
  { testament: 'NT', bookNumber: 7, bookName: '1 Corinthians', totalChapters: 16 },
  { testament: 'NT', bookNumber: 8, bookName: '2 Corinthians', totalChapters: 13 },
  { testament: 'NT', bookNumber: 9, bookName: 'Galatians', totalChapters: 6 },
  { testament: 'NT', bookNumber: 10, bookName: 'Ephesians', totalChapters: 6 },
  { testament: 'NT', bookNumber: 11, bookName: 'Philippians', totalChapters: 4 },
  { testament: 'NT', bookNumber: 12, bookName: 'Colossians', totalChapters: 4 },
  { testament: 'NT', bookNumber: 13, bookName: '1 Thessalonians', totalChapters: 5 },
  { testament: 'NT', bookNumber: 14, bookName: '2 Thessalonians', totalChapters: 3 },
  { testament: 'NT', bookNumber: 15, bookName: '1 Timothy', totalChapters: 6 },
  { testament: 'NT', bookNumber: 16, bookName: '2 Timothy', totalChapters: 4 },
  { testament: 'NT', bookNumber: 17, bookName: 'Titus', totalChapters: 3 },
  { testament: 'NT', bookNumber: 18, bookName: 'Philemon', totalChapters: 1 },
  { testament: 'NT', bookNumber: 19, bookName: 'Hebrews', totalChapters: 13 },
  { testament: 'NT', bookNumber: 20, bookName: 'James', totalChapters: 5 },
  { testament: 'NT', bookNumber: 21, bookName: '1 Peter', totalChapters: 5 },
  { testament: 'NT', bookNumber: 22, bookName: '2 Peter', totalChapters: 3 },
  { testament: 'NT', bookNumber: 23, bookName: '1 John', totalChapters: 5 },
  { testament: 'NT', bookNumber: 24, bookName: '2 John', totalChapters: 1 },
  { testament: 'NT', bookNumber: 25, bookName: '3 John', totalChapters: 1 },
  { testament: 'NT', bookNumber: 26, bookName: 'Jude', totalChapters: 1 },
  { testament: 'NT', bookNumber: 27, bookName: 'Revelation', totalChapters: 22 },
];

// Sample verse content for demo purposes with correct scriptural references
// In production, load actual Bible text from a file or API

// OLD TESTAMENT VERSES - mapped to their correct locations
interface VerseMapping {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const OT_VERSE_MAPPINGS: VerseMapping[] = [
  // Genesis (Chapters 1-3 for demo)
  { book: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
  { book: 'Genesis', chapter: 1, verse: 27, text: 'So God created mankind in his own image, in the image of God he created them; male and female he created them.' },
  { book: 'Genesis', chapter: 2, verse: 2, text: 'By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.' },
  { book: 'Genesis', chapter: 2, verse: 3, text: 'Then God blessed the seventh day and made it holy, because on it he rested from all the work of creating that he had done.' },
  { book: 'Genesis', chapter: 3, verse: 1, text: 'Now the serpent was more crafty than any of the wild animals the Lord God had made.' },

  // Exodus (Chapters 1-3)
  { book: 'Exodus', chapter: 1, verse: 1, text: 'These are the names of the sons of Israel who went to Egypt with Jacob, each with his family.' },
  { book: 'Exodus', chapter: 2, verse: 1, text: 'Now a man of the tribe of Levi married a Levite woman.' },
  { book: 'Exodus', chapter: 2, verse: 24, text: 'God heard their groaning and he remembered his covenant with Abraham, with Isaac and with Jacob.' },
  { book: 'Exodus', chapter: 3, verse: 1, text: 'Now Moses was tending the flock of Jethro his father-in-law, the priest of Midian, and he led the flock to the far side of the wilderness.' },
  { book: 'Exodus', chapter: 3, verse: 14, text: 'God said to Moses, "I am who I am. This is what you are to say to the Israelites: \'I am has sent me to you.\'"' },

  // Leviticus (Chapters 1-3)
  { book: 'Leviticus', chapter: 1, verse: 1, text: 'The Lord called to Moses and spoke to him from the tent of meeting.' },
  { book: 'Leviticus', chapter: 2, verse: 1, text: 'When anyone brings a grain offering to the Lord, their offering is to be of the finest flour.' },
  { book: 'Leviticus', chapter: 3, verse: 1, text: 'If anyone\'s offering is a fellowship offering, and they offer an animal from the herd, whether male or female, they are to present an animal without defect before the Lord.' },

  // Numbers (Chapters 1-3)
  { book: 'Numbers', chapter: 1, verse: 1, text: 'The Lord spoke to Moses in the tent of meeting in the Desert of Sinai on the first day of the second month of the second year after the Israelites came out of Egypt.' },
  { book: 'Numbers', chapter: 2, verse: 1, text: 'The Lord said to Moses and Aaron.' },
  { book: 'Numbers', chapter: 3, verse: 1, text: 'This is the account of the family line of Aaron and Moses at the time the Lord spoke to Moses at Mount Sinai.' },

  // Deuteronomy (Chapters 1-3)
  { book: 'Deuteronomy', chapter: 1, verse: 1, text: 'These are the words Moses spoke to all Israel in the wilderness east of the Jordan.' },
  { book: 'Deuteronomy', chapter: 1, verse: 8, text: 'See, I have given you this land. Go in and take possession of the land the Lord swore he would give to your fathers.' },
  { book: 'Deuteronomy', chapter: 2, verse: 1, text: 'Then we turned back and set out toward the wilderness along the route to the Red Sea, as the Lord had directed me.' },
  { book: 'Deuteronomy', chapter: 3, verse: 1, text: 'Next we turned and went up along the road toward Bashan, and Og king of Bashan with his whole army marched out to meet us in battle at Edrei.' },

  // Joshua (Chapters 1-3)
  { book: 'Joshua', chapter: 1, verse: 1, text: 'After the death of Moses the servant of the Lord, the Lord said to Joshua son of Nun, Moses\' aide.' },
  { book: 'Joshua', chapter: 1, verse: 8, text: 'Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it.' },
  { book: 'Joshua', chapter: 2, verse: 1, text: 'Then Joshua son of Nun secretly sent two spies from Shittim. "Go, look over the land," he said, "especially Jericho."' },
  { book: 'Joshua', chapter: 3, verse: 1, text: 'Early in the morning Joshua and all the Israelites set out from Shittim and went to the Jordan, where they camped before crossing over.' },

  // Judges (Chapters 1-3)
  { book: 'Judges', chapter: 1, verse: 1, text: 'After the death of Joshua, the Israelites asked the Lord, "Who of us is to go up first to fight against the Canaanites?"' },
  { book: 'Judges', chapter: 2, verse: 1, text: 'The angel of the Lord went up from Gilgal to Bokim and said, "I brought you up out of Egypt and led you into the land I swore to give to your ancestors."' },
  { book: 'Judges', chapter: 3, verse: 1, text: 'These are the nations the Lord left to test all those Israelites who had not experienced any of the wars in Canaan.' },

  // Ruth (All 4 chapters)
  { book: 'Ruth', chapter: 1, verse: 1, text: 'In the days when the judges ruled, there was a famine in the land.' },
  { book: 'Ruth', chapter: 2, verse: 1, text: 'Now Naomi had a relative on her husband\'s side, from the clan of Elimelech, a man of standing, whose name was Boaz.' },
  { book: 'Ruth', chapter: 3, verse: 11, text: 'All the people of my town know that you are a woman of noble character.' },
  { book: 'Ruth', chapter: 4, verse: 1, text: 'Meanwhile Boaz went up to the town gate and sat down there just as the guardian-redeemer he had mentioned came by.' },

  // 1 Samuel (Chapters 1-3)
  { book: '1 Samuel', chapter: 1, verse: 1, text: 'There was a certain man from Ramathaim, a Zuphite from the hill country of Ephraim, whose name was Elkanah.' },
  { book: '1 Samuel', chapter: 2, verse: 1, text: 'Then Hannah prayed and said: "My heart rejoices in the Lord; in the Lord my horn is lifted high."' },
  { book: '1 Samuel', chapter: 3, verse: 1, text: 'The boy Samuel ministered before the Lord under Eli. In those days the word of the Lord was rare; there were not many visions.' },
  { book: '1 Samuel', chapter: 3, verse: 4, text: 'Then the Lord called Samuel. Samuel answered, "Here I am."' },

  // 2 Samuel (Chapters 1-3)
  { book: '2 Samuel', chapter: 1, verse: 1, text: 'After the death of Saul, David returned from striking down the Amalekites and stayed in Ziklag two days.' },
  { book: '2 Samuel', chapter: 2, verse: 1, text: 'In the course of time, David inquired of the Lord. "Shall I go up to one of the towns of Judah?" he asked.' },
  { book: '2 Samuel', chapter: 3, verse: 1, text: 'The war between the house of Saul and the house of David lasted a long time. David grew stronger and stronger, while the house of Saul grew weaker and weaker.' },

  // 1 Kings (Chapters 1-3)
  { book: '1 Kings', chapter: 1, verse: 1, text: 'When King David was very old, he could not keep warm even when they laid blankets over him.' },
  { book: '1 Kings', chapter: 2, verse: 1, text: 'When the time drew near for David to die, he gave a charge to Solomon his son.' },
  { book: '1 Kings', chapter: 3, verse: 1, text: 'Solomon made an alliance with Pharaoh king of Egypt and married his daughter.' },
  { book: '1 Kings', chapter: 3, verse: 12, text: 'I will do what you have asked. I will give you a wise and discerning heart, so that there will never have been anyone like you.' },

  // 2 Kings (Chapters 1-3)
  { book: '2 Kings', chapter: 1, verse: 1, text: 'After Ahab\'s death, Moab rebelled against Israel.' },
  { book: '2 Kings', chapter: 2, verse: 1, text: 'When the Lord was about to take Elijah up to heaven in a whirlwind, Elijah and Elisha were on their way from Gilgal.' },
  { book: '2 Kings', chapter: 2, verse: 11, text: 'As they were walking along and talking together, suddenly a chariot of fire and horses of fire appeared and separated the two of them, and Elijah went up to heaven in a whirlwind.' },
  { book: '2 Kings', chapter: 3, verse: 1, text: 'Joram son of Ahab became king of Israel in Samaria in the eighteenth year of Jehoshaphat king of Judah, and he reigned twelve years.' },

  // 1 Chronicles (Chapters 1-3)
  { book: '1 Chronicles', chapter: 1, verse: 1, text: 'Adam, Seth, Enosh, Kenan, Mahalalel, Jared, Enoch, Methuselah, Lamech, Noah.' },
  { book: '1 Chronicles', chapter: 2, verse: 1, text: 'These were the sons of Israel: Reuben, Simeon, Levi, Judah, Issachar, Zebulun, Dan, Joseph, Benjamin, Naphtali, Gad and Asher.' },
  { book: '1 Chronicles', chapter: 3, verse: 1, text: 'These were the sons of David born to him in Hebron: The firstborn was Amnon the son of Ahinoam; the second, Daniel the son of Abigail.' },

  // 2 Chronicles (Chapters 1-3)
  { book: '2 Chronicles', chapter: 1, verse: 1, text: 'Solomon son of David established himself firmly over his kingdom, for the Lord his God was with him and made him exceedingly great.' },
  { book: '2 Chronicles', chapter: 2, verse: 1, text: 'Solomon gave orders to build a temple for the Name of the Lord and a royal palace for himself.' },
  { book: '2 Chronicles', chapter: 3, verse: 1, text: 'Then Solomon began to build the temple of the Lord in Jerusalem on Mount Moriah, where the Lord had appeared to his father David.' },

  // Ezra (All 10 chapters - shorter book)
  { book: 'Ezra', chapter: 1, verse: 1, text: 'In the first year of Cyrus king of Persia, in order to fulfill the word of the Lord spoken by Jeremiah, the Lord moved the heart of Cyrus king of Persia.' },
  { book: 'Ezra', chapter: 2, verse: 1, text: 'Now these are the people of the province who came up from the captivity of the exiles whom Nebuchadnezzar had taken captive to Babylon.' },
  { book: 'Ezra', chapter: 3, verse: 1, text: 'When the seventh month came and the Israelites had settled in their towns, the people assembled together as one in Jerusalem.' },

  // Nehemiah (Chapters 1-3)
  { book: 'Nehemiah', chapter: 1, verse: 1, text: 'The words of Nehemiah son of Hacaliah: In the month of Kislev in the twentieth year, while I was in the citadel of Susa.' },
  { book: 'Nehemiah', chapter: 2, verse: 1, text: 'In the month of Nisan in the twentieth year of King Artaxerxes, when wine was brought for him, I took the wine and gave it to the king.' },
  { book: 'Nehemiah', chapter: 3, verse: 1, text: 'Eliashib the high priest and his fellow priests went to work and rebuilt the Sheep Gate.' },

  // Esther (Chapters 1-3)
  { book: 'Esther', chapter: 1, verse: 1, text: 'This is what happened during the time of Xerxes, the Xerxes who ruled over 127 provinces stretching from India to Cush.' },
  { book: 'Esther', chapter: 2, verse: 1, text: 'Later when King Xerxes\' fury had subsided, he remembered Vashti and what she had done and what he had decreed about her.' },
  { book: 'Esther', chapter: 3, verse: 1, text: 'After these events, King Xerxes honored Haman son of Hammedatha, the Agagite, elevating him and giving him a seat of honor.' },

  // Job (Chapters 1-3)
  { book: 'Job', chapter: 1, verse: 1, text: 'In the land of Uz there lived a man whose name was Job. This man was blameless and upright; he feared God and shunned evil.' },
  { book: 'Job', chapter: 2, verse: 1, text: 'On another day the angels came to present themselves before the Lord, and Satan also came with them to present himself before him.' },
  { book: 'Job', chapter: 3, verse: 1, text: 'After this, Job opened his mouth and cursed the day of his birth.' },

  // Psalms (Chapters 1-3)
  { book: 'Psalms', chapter: 1, verse: 1, text: 'Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers.' },
  { book: 'Psalms', chapter: 2, verse: 1, text: 'Why do the nations conspire and the peoples plot in vain?' },
  { book: 'Psalms', chapter: 3, verse: 1, text: 'Lord, how many are my foes! How many rise up against me!' },

  // Proverbs (Chapters 1-3)
  { book: 'Proverbs', chapter: 1, verse: 1, text: 'The proverbs of Solomon son of David, king of Israel.' },
  { book: 'Proverbs', chapter: 1, verse: 7, text: 'The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.' },
  { book: 'Proverbs', chapter: 2, verse: 1, text: 'My son, if you accept my words and store up my commands within you.' },
  { book: 'Proverbs', chapter: 3, verse: 1, text: 'My son, do not forget my teaching, but keep my commands in your heart.' },

  // Ecclesiastes (All 12 chapters - shorter book)
  { book: 'Ecclesiastes', chapter: 1, verse: 1, text: 'The words of the Teacher, son of David, king in Jerusalem.' },
  { book: 'Ecclesiastes', chapter: 2, verse: 1, text: 'I said to myself, "Come now, I will test you with pleasure to find out what is good."' },
  { book: 'Ecclesiastes', chapter: 3, verse: 1, text: 'There is a time for everything, and a season for every activity under the heavens.' },

  // Isaiah (Chapters 1-3)
  { book: 'Isaiah', chapter: 1, verse: 1, text: 'The vision concerning Judah and Jerusalem that Isaiah son of Amoz saw during the reigns of Uzziah, Jotham, Ahaz and Hezekiah, kings of Judah.' },
  { book: 'Isaiah', chapter: 2, verse: 1, text: 'This is what Isaiah son of Amoz saw concerning Judah and Jerusalem.' },
  { book: 'Isaiah', chapter: 3, verse: 1, text: 'See now, the Lord, the Lord Almighty, is about to take from Jerusalem and Judah both supply and support.' },

  // Jeremiah (Chapters 1-3)
  { book: 'Jeremiah', chapter: 1, verse: 1, text: 'The words of Jeremiah son of Hilkiah, one of the priests at Anathoth in the territory of Benjamin.' },
  { book: 'Jeremiah', chapter: 2, verse: 1, text: 'The word of the Lord came to me.' },
  { book: 'Jeremiah', chapter: 3, verse: 1, text: '"If a man divorces his wife and she leaves him and marries another man, should he return to her?"' },

  // Lamentations (All 5 chapters)
  { book: 'Lamentations', chapter: 1, verse: 1, text: 'How deserted lies the city, once so full of people! How like a widow is she, who once was great among the nations!' },
  { book: 'Lamentations', chapter: 2, verse: 1, text: 'How the Lord has covered the Daughter of Zion with the cloud of his anger!' },
  { book: 'Lamentations', chapter: 3, verse: 22, text: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail.' },

  // Ezekiel (Chapters 1-3)
  { book: 'Ezekiel', chapter: 1, verse: 1, text: 'In my thirtieth year, in the fourth month on the fifth day, while I was among the exiles by the Kebar River, the heavens were opened and I saw visions of God.' },
  { book: 'Ezekiel', chapter: 2, verse: 1, text: 'He said to me, "Son of man, stand up on your feet and I will speak to you."' },
  { book: 'Ezekiel', chapter: 3, verse: 1, text: 'And he said to me, "Son of man, eat what is before you, eat this scroll; then go and speak to the people of Israel."' },

  // Daniel (All 12 chapters)
  { book: 'Daniel', chapter: 1, verse: 1, text: 'In the third year of the reign of Jehoiakim king of Judah, Nebuchadnezzar king of Babylon came to Jerusalem and besieged it.' },
  { book: 'Daniel', chapter: 2, verse: 1, text: 'In the second year of his reign, Nebuchadnezzar had dreams; his mind was troubled and he could not sleep.' },
  { book: 'Daniel', chapter: 3, verse: 1, text: 'King Nebuchadnezzar made an image of gold, sixty cubits high and six cubits wide, and set it up on the plain of Dura in the province of Babylon.' },

  // Hosea (All 14 chapters)
  { book: 'Hosea', chapter: 1, verse: 1, text: 'The word of the Lord that came to Hosea son of Beeri during the reigns of Uzziah, Jotham, Ahaz and Hezekiah, kings of Judah, and during the reign of Jeroboam son of Jehoash, king of Israel.' },
  { book: 'Hosea', chapter: 2, verse: 1, text: '"Say of your brothers, \'My people\' and of your sisters, \'My loved one.\'"' },
  { book: 'Hosea', chapter: 3, verse: 1, text: 'The Lord said to me, "Go, show your love to your wife again, though she is loved by another and is an adulteress."' },

  // Joel (All 3 chapters)
  { book: 'Joel', chapter: 1, verse: 1, text: 'The word of the Lord that came to Joel son of Pethuel.' },
  { book: 'Joel', chapter: 2, verse: 1, text: 'Blow the trumpet in Zion; sound the alarm on my holy hill. Let all who live in the land tremble, for the day of the Lord is coming.' },
  { book: 'Joel', chapter: 3, verse: 1, text: '"In those days and at that time, when I restore the fortunes of Judah and Jerusalem, I will gather all nations and bring them down to the Valley of Jehoshaphat."' },

  // Amos (All 9 chapters)
  { book: 'Amos', chapter: 1, verse: 1, text: 'The words of Amos, one of the shepherds of Tekoa—the vision he saw concerning Israel two years before the earthquake, when Uzziah was king of Judah and Jeroboam son of Jehoash was king of Israel.' },
  { book: 'Amos', chapter: 2, verse: 1, text: 'This is what the Lord says: "For three sins of Moab, even for four, I will not turn back my wrath."' },
  { book: 'Amos', chapter: 3, verse: 1, text: 'Hear this word, people of Israel, that the Lord has spoken against you—against the whole family I brought up out of Egypt.' },

  // Obadiah (1 chapter)
  { book: 'Obadiah', chapter: 1, verse: 1, text: 'The vision of Obadiah. This is what the Sovereign Lord says about Edom—We have heard a message from the Lord: An envoy was sent to the nations.' },

  // Jonah (All 4 chapters)
  { book: 'Jonah', chapter: 1, verse: 1, text: 'The word of the Lord came to Jonah son of Amittai.' },
  { book: 'Jonah', chapter: 2, verse: 1, text: 'From inside the fish Jonah prayed to the Lord his God.' },
  { book: 'Jonah', chapter: 3, verse: 1, text: 'Then the word of the Lord came to Jonah a second time.' },
  { book: 'Jonah', chapter: 4, verse: 1, text: 'But to Jonah this seemed very wrong, and he became angry.' },

  // Micah (All 7 chapters)
  { book: 'Micah', chapter: 1, verse: 1, text: 'The word of the Lord that came to Micah of Moresheth during the reigns of Jotham, Ahaz and Hezekiah, kings of Judah.' },
  { book: 'Micah', chapter: 2, verse: 1, text: 'Woe to those who plan iniquity, to those who plot evil on their beds! At morning\'s light they carry it out because it is in their power.' },
  { book: 'Micah', chapter: 3, verse: 1, text: 'Then I said, "Listen, you leaders of Jacob, you rulers of Israel. Should you not embrace justice?"' },

  // Nahum (All 3 chapters)
  { book: 'Nahum', chapter: 1, verse: 1, text: 'A prophecy concerning Nineveh. The book of the vision of Nahum the Elkoshite.' },
  { book: 'Nahum', chapter: 2, verse: 1, text: 'An attacker advances against you, Nineveh. Guard the fortress, watch the road, brace yourselves, marshal all your strength!' },
  { book: 'Nahum', chapter: 3, verse: 1, text: 'Woe to the city of blood, full of lies, full of plunder, never without victims!' },

  // Habakkuk (All 3 chapters)
  { book: 'Habakkuk', chapter: 1, verse: 1, text: 'The prophecy that Habakkuk the prophet received.' },
  { book: 'Habakkuk', chapter: 2, verse: 1, text: 'I will stand at my watch and station myself on the ramparts; I will look to see what he will say to me, and what answer I should give to this complaint.' },
  { book: 'Habakkuk', chapter: 3, verse: 1, text: 'A prayer of Habakkuk the prophet. On shigionoth.' },

  // Zephaniah (All 3 chapters)
  { book: 'Zephaniah', chapter: 1, verse: 1, text: 'The word of the Lord that came to Zephaniah son of Cushi, the son of Gedaliah, the son of Amariah, the son of Hezekiah, during the reign of Josiah son of Amon, king of Judah.' },
  { book: 'Zephaniah', chapter: 2, verse: 1, text: 'Gather together, gather yourselves together, you shameful nation, before the decree takes effect and that day sweeps on like chaff, before the Lord\'s fierce anger comes upon you.' },
  { book: 'Zephaniah', chapter: 3, verse: 17, text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.' },

  // Haggai (All 2 chapters)
  { book: 'Haggai', chapter: 1, verse: 1, text: 'In the second year of King Darius, on the first day of the sixth month, the word of the Lord came through the prophet Haggai to Zerubbabel son of Shealtiel, governor of Judah, and to Joshua son of Jozadak, the high priest.' },
  { book: 'Haggai', chapter: 2, verse: 4, text: 'But now be strong, Zerubbabel,\' declares the Lord. \'Be strong, Joshua son of Jozadak, the high priest. Be strong, all you people of the land,\' declares the Lord.' },

  // Zechariah (Chapters 1-3)
  { book: 'Zechariah', chapter: 1, verse: 1, text: 'In the eighth month of the second year of Darius, the word of the Lord came to the prophet Zechariah son of Berekiah, the son of Iddo.' },
  { book: 'Zechariah', chapter: 2, verse: 8, text: 'For this is what the Lord Almighty says: "After the Glorious One has sent me against the nations that have plundered you—for whoever touches you touches the apple of his eye."' },
  { book: 'Zechariah', chapter: 3, verse: 1, text: 'Then he showed me Joshua the high priest standing before the angel of the Lord, and Satan standing at his right side to accuse him.' },

  // Malachi (All 4 chapters)
  { book: 'Malachi', chapter: 1, verse: 1, text: 'A prophecy: The word of the Lord to Israel through Malachi.' },
  { book: 'Malachi', chapter: 2, verse: 1, text: '"Now, you priests, this warning is for you."' },
  { book: 'Malachi', chapter: 3, verse: 10, text: 'Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this," says the Lord Almighty, "and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it."' },
  { book: 'Malachi', chapter: 4, verse: 1, text: '"Surely the day is coming; it will burn like a furnace. All the arrogant and every evildoer will be stubble, and the day that is coming will set them on fire," says the Lord Almighty.' },
];

// NEW TESTAMENT VERSES - mapped to their correct locations
// Multiple verses per book to cover the demo's first 3 chapters per book
const NT_VERSE_MAPPINGS: VerseMapping[] = [
  // Matthew (Chapters 1-3 shown in demo)
  { book: 'Matthew', chapter: 1, verse: 1, text: 'This is the genealogy of Jesus the Messiah the son of David, the son of Abraham.' },
  { book: 'Matthew', chapter: 1, verse: 21, text: 'She will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins.' },
  { book: 'Matthew', chapter: 2, verse: 1, text: 'After Jesus was born in Bethlehem in Judea, during the time of King Herod, Magi from the east came to Jerusalem.' },
  { book: 'Matthew', chapter: 2, verse: 10, text: 'When they saw the star, they were overjoyed.' },
  { book: 'Matthew', chapter: 3, verse: 16, text: 'As soon as Jesus was baptized, he went up out of the water. At that moment heaven was opened, and he saw the Spirit of God descending like a dove.' },
  { book: 'Matthew', chapter: 3, verse: 17, text: 'And a voice from heaven said, "This is my Son, whom I love; with him I am well pleased."' },

  // Mark (Chapters 1-3)
  { book: 'Mark', chapter: 1, verse: 1, text: 'The beginning of the gospel about Jesus the Messiah, the Son of God, as it is written in Isaiah the prophet.' },
  { book: 'Mark', chapter: 1, verse: 15, text: 'The time has come, he said. The kingdom of God has come near. Repent and believe the good news!' },
  { book: 'Mark', chapter: 2, verse: 5, text: 'When Jesus saw their faith, he said to the paralyzed man, "Son, your sins are forgiven."' },
  { book: 'Mark', chapter: 2, verse: 17, text: 'On hearing this, Jesus said to them, "It is not the healthy who need a doctor, but the sick."' },
  { book: 'Mark', chapter: 3, verse: 35, text: 'Whoever does God\'s will is my brother and sister and mother.' },

  // Luke (Chapters 1-3)
  { book: 'Luke', chapter: 1, verse: 1, text: 'Many have undertaken to draw up an account of the things that have been fulfilled among us.' },
  { book: 'Luke', chapter: 1, verse: 37, text: 'For no word from God will ever fail.' },
  { book: 'Luke', chapter: 2, verse: 10, text: 'But the angel said to them, "Do not be afraid. I bring you good news that will cause great joy for all the people."' },
  { book: 'Luke', chapter: 2, verse: 11, text: 'Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.' },
  { book: 'Luke', chapter: 3, verse: 22, text: 'And the Holy Spirit descended on him in bodily form like a dove. And a voice came from heaven: "You are my Son, whom I love; with you I am well pleased."' },

  // John (Chapters 1-3)
  { book: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
  { book: 'John', chapter: 1, verse: 14, text: 'The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.' },
  { book: 'John', chapter: 2, verse: 11, text: 'What Jesus did here in Cana of Galilee was the first of the signs through which he revealed his glory; and his disciples believed in him.' },
  { book: 'John', chapter: 2, verse: 25, text: 'Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council.' },
  { book: 'John', chapter: 3, verse: 16, text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },

  // Acts (Chapters 1-3)
  { book: 'Acts', chapter: 1, verse: 8, text: 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.' },
  { book: 'Acts', chapter: 2, verse: 1, text: 'When the day of Pentecost came, they were all together in one place.' },
  { book: 'Acts', chapter: 2, verse: 38, text: 'Peter replied, "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins."' },
  { book: 'Acts', chapter: 3, verse: 12, text: 'When Peter saw this, he said to them: "Fellow Israelites, why does this surprise you?"' },

  // Romans (Chapters 1-3)
  { book: 'Romans', chapter: 1, verse: 16, text: 'For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.' },
  { book: 'Romans', chapter: 2, verse: 1, text: 'You, therefore, have no excuse, you who pass judgment on someone else, for at whatever point you judge another, you are condemning yourself.' },
  { book: 'Romans', chapter: 3, verse: 23, text: 'For all have sinned and fall short of the glory of God.' },

  // 1 Corinthians (Chapters 1-3)
  { book: '1 Corinthians', chapter: 1, verse: 18, text: 'For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God.' },
  { book: '1 Corinthians', chapter: 2, verse: 2, text: 'For I resolved to know nothing while I was with you except Jesus Christ and him crucified.' },
  { book: '1 Corinthians', chapter: 3, verse: 16, text: 'Don\'t you know that you yourselves are God\'s temple and that God\'s Spirit dwells in your midst?' },
  { book: '1 Corinthians', chapter: 16, verse: 14, text: 'Let all that you do be done in love.' },

  // 2 Corinthians (Chapters 1-3)
  { book: '2 Corinthians', chapter: 1, verse: 3, text: 'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort.' },
  { book: '2 Corinthians', chapter: 2, verse: 14, text: 'But thanks be to God, who always leads us as captives in the triumphal procession of Christ.' },
  { book: '2 Corinthians', chapter: 3, verse: 18, text: 'And we all, who with unveiled faces contemplate the Lord\'s glory, are being transformed into his image with ever-increasing glory.' },
  { book: '2 Corinthians', chapter: 5, verse: 17, text: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!' },

  // Galatians (Chapters 1-3)
  { book: 'Galatians', chapter: 1, verse: 10, text: 'Am I now trying to win the approval of human beings, or of God? Or am I trying to please people?' },
  { book: 'Galatians', chapter: 2, verse: 20, text: 'I have been crucified with Christ and I no longer live, but Christ lives in me.' },
  { book: 'Galatians', chapter: 3, verse: 26, text: 'So in Christ Jesus you are all children of God through faith.' },
  { book: 'Galatians', chapter: 5, verse: 22, text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.' },

  // Ephesians (Chapters 1-3)
  { book: 'Ephesians', chapter: 1, verse: 3, text: 'Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.' },
  { book: 'Ephesians', chapter: 2, verse: 8, text: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.' },
  { book: 'Ephesians', chapter: 3, verse: 20, text: 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.' },
  { book: 'Ephesians', chapter: 6, verse: 10, text: 'Finally, be strong in the Lord and in his mighty power.' },

  // Philippians (All 4 chapters)
  { book: 'Philippians', chapter: 1, verse: 6, text: 'Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.' },
  { book: 'Philippians', chapter: 2, verse: 5, text: 'In your relationships with one another, have the same mindset as Christ Jesus.' },
  { book: 'Philippians', chapter: 3, verse: 20, text: 'But our citizenship is in heaven. And we eagerly await a Savior from there, the Lord Jesus Christ.' },
  { book: 'Philippians', chapter: 4, verse: 13, text: 'I can do all this through Christ, who gives me strength.' },

  // Colossians (All 4 chapters)
  { book: 'Colossians', chapter: 1, verse: 13, text: 'For he has rescued us from the dominion of darkness and brought us into the kingdom of the Son he loves.' },
  { book: 'Colossians', chapter: 2, verse: 6, text: 'So then, just as you received Christ Jesus as Lord, continue to live your lives in him.' },
  { book: 'Colossians', chapter: 3, verse: 16, text: 'Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit.' },

  // 1 Thessalonians (All 5 chapters)
  { book: '1 Thessalonians', chapter: 1, verse: 3, text: 'We remember before our God and Father your work produced by faith, your labor prompted by love, and your endurance inspired by hope in our Lord Jesus Christ.' },
  { book: '1 Thessalonians', chapter: 2, verse: 13, text: 'And we also thank God continually because, when you received the word of God, which you heard from us, you accepted it not as a human word, but as it actually is, the word of God.' },
  { book: '1 Thessalonians', chapter: 3, verse: 12, text: 'May the Lord make your love increase and overflow for each other and for everyone else.' },
  { book: '1 Thessalonians', chapter: 4, verse: 3, text: 'It is God\'s will that you should be sanctified: that you should avoid sexual immorality.' },
  { book: '1 Thessalonians', chapter: 5, verse: 17, text: 'Pray without ceasing.' },

  // 2 Thessalonians (All 3 chapters)
  { book: '2 Thessalonians', chapter: 1, verse: 3, text: 'We ought always to thank God for you, brothers and sisters, and rightly so, because your faith is growing more and more, and the love all of you have for one another is increasing.' },
  { book: '2 Thessalonians', chapter: 2, verse: 13, text: 'But we ought always to thank God for you, brothers and sisters loved by the Lord, because God chose you as firstfruits to be saved through the sanctifying work of the Spirit and through belief in the truth.' },
  { book: '2 Thessalonians', chapter: 3, verse: 3, text: 'But the Lord is faithful, and he will strengthen you and protect you from the evil one.' },

  // 1 Timothy (All 6 chapters)
  { book: '1 Timothy', chapter: 1, verse: 15, text: 'Here is a trustworthy saying that deserves full acceptance: Christ Jesus came into the world to save sinners.' },
  { book: '1 Timothy', chapter: 2, verse: 5, text: 'For there is one God and one mediator between God and mankind, the man Christ Jesus.' },
  { book: '1 Timothy', chapter: 3, verse: 16, text: 'Beyond all question, the mystery from which true godliness springs is great.' },
  { book: '1 Timothy', chapter: 4, verse: 4, text: 'For everything God created is good, and nothing is to be rejected if it is received with thanksgiving.' },
  { book: '1 Timothy', chapter: 5, verse: 1, text: 'Do not rebuke an older man harshly, but exhort him as if he were your father.' },
  { book: '1 Timothy', chapter: 6, verse: 10, text: 'For the love of money is a root of all kinds of evil.' },

  // 2 Timothy (All 4 chapters)
  { book: '2 Timothy', chapter: 1, verse: 7, text: 'For the Spirit God gave us does not make us timid, but gives us power, love and a sound mind.' },
  { book: '2 Timothy', chapter: 2, verse: 2, text: 'And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others.' },
  { book: '2 Timothy', chapter: 3, verse: 16, text: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.' },
  { book: '2 Timothy', chapter: 4, verse: 7, text: 'I have fought the good fight, I have finished the race, I have kept the faith.' },

  // Titus (All 3 chapters)
  { book: 'Titus', chapter: 1, verse: 5, text: 'The reason I left you in Crete was that you might put in order what was left unfinished and appoint elders in every town.' },
  { book: 'Titus', chapter: 2, verse: 11, text: 'For the grace of God has appeared that offers salvation to all people.' },
  { book: 'Titus', chapter: 3, verse: 5, text: 'He saved us, not because of righteous things we had done, but because of his mercy.' },

  // Philemon (1 chapter)
  { book: 'Philemon', chapter: 1, verse: 6, text: 'I pray that you may be active in sharing your faith, so that you will have a full understanding of every good thing we have in Christ.' },

  // Hebrews (First 3 chapters + key verse)
  { book: 'Hebrews', chapter: 1, verse: 1, text: 'In the past God spoke to our ancestors through the prophets at many times and in various ways.' },
  { book: 'Hebrews', chapter: 2, verse: 3, text: 'How shall we escape if we ignore so great a salvation?' },
  { book: 'Hebrews', chapter: 3, verse: 4, text: 'For every house is built by someone, but God is the builder of everything.' },
  { book: 'Hebrews', chapter: 11, verse: 1, text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },

  // James (All 5 chapters)
  { book: 'James', chapter: 1, verse: 22, text: 'Do not merely listen to the word, and so deceive yourselves. Do what it says.' },
  { book: 'James', chapter: 2, verse: 26, text: 'As the body without the spirit is dead, so faith without deeds is dead.' },
  { book: 'James', chapter: 3, verse: 6, text: 'The tongue also is a fire, a world of evil among the parts of the body.' },
  { book: 'James', chapter: 4, verse: 7, text: 'Submit yourselves, then, to God. Resist the devil, and he will flee from you.' },
  { book: 'James', chapter: 5, verse: 16, text: 'Therefore confess your sins to each other and pray for each other so that you may be healed.' },

  // 1 Peter (All 5 chapters)
  { book: '1 Peter', chapter: 1, verse: 3, text: 'Praise be to the God and Father of our Lord Jesus Christ!' },
  { book: '1 Peter', chapter: 2, verse: 9, text: 'But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession.' },
  { book: '1 Peter', chapter: 3, verse: 15, text: 'But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.' },
  { book: '1 Peter', chapter: 4, verse: 10, text: 'Each of you should use whatever gift you have received to serve others, as faithful stewards of God\'s grace in its various forms.' },
  { book: '1 Peter', chapter: 5, verse: 7, text: 'Cast all your anxiety on him because he cares for you.' },

  // 2 Peter (All 3 chapters)
  { book: '2 Peter', chapter: 1, verse: 3, text: 'His divine power has given us everything we need for a godly life through our knowledge of him who called us by his own glory and goodness.' },
  { book: '2 Peter', chapter: 2, verse: 1, text: 'But there were also false prophets among the people, just as there will be false teachers among you.' },
  { book: '2 Peter', chapter: 3, verse: 9, text: 'The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient, not wanting anyone to perish.' },

  // 1 John (All 5 chapters)
  { book: '1 John', chapter: 1, verse: 1, text: 'That which was from the beginning, which we have heard, which we have seen with our eyes, which we have looked at and our hands have touched.' },
  { book: '1 John', chapter: 2, verse: 3, text: 'We know that we have come to know him if we keep his commands.' },
  { book: '1 John', chapter: 3, verse: 1, text: 'See what great love the Father has lavished on us, that we should be called children of God!' },
  { book: '1 John', chapter: 4, verse: 7, text: 'Dear friends, let us love one another, for love comes from God.' },
  { book: '1 John', chapter: 5, verse: 4, text: 'For everyone born of God overcomes the world.' },

  // 2 John (1 chapter)
  { book: '2 John', chapter: 1, verse: 6, text: 'And this is love: that we walk in obedience to his commands.' },

  // 3 John (1 chapter)
  { book: '3 John', chapter: 1, verse: 11, text: 'Dear friend, do not imitate what is evil but what is good.' },

  // Jude (1 chapter)
  { book: 'Jude', chapter: 1, verse: 24, text: 'To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy.' },

  // Revelation (First 3 chapters + key verse)
  { book: 'Revelation', chapter: 1, verse: 3, text: 'Blessed is the one who reads aloud the words of this prophecy, and blessed are those who hear it and take to heart what is written in it.' },
  { book: 'Revelation', chapter: 2, verse: 7, text: 'Whoever has ears, let them hear what the Spirit says to the churches.' },
  { book: 'Revelation', chapter: 3, verse: 20, text: 'Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.' },
  { book: 'Revelation', chapter: 21, verse: 4, text: 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.' },
];

function generateSampleVerses(bookName: string, testament: 'OT' | 'NT', chapterNum: number, verseCount: number = 25) {
  // Get the appropriate verse mappings for this testament
  const verseMappings = testament === 'OT' ? OT_VERSE_MAPPINGS : NT_VERSE_MAPPINGS;

  // Create a map of book+chapter combinations that have real verses
  const mappedVerses = new Map<string, VerseMapping>();
  verseMappings.forEach(vm => {
    if (vm.book === bookName && vm.chapter === chapterNum) {
      mappedVerses.set(`${vm.book}:${vm.chapter}:${vm.verse}`, vm);
    }
  });

  return Array.from({ length: verseCount }, (_, i) => {
    const verseNum = i + 1;
    const key = `${bookName}:${chapterNum}:${verseNum}`;

    // Check if we have a real verse for this exact location
    const mappedVerse = mappedVerses.get(key);
    const text = mappedVerse
      ? mappedVerse.text
      : `This is ${bookName} ${chapterNum}:${verseNum}. Sample verse text for demonstration purposes.`;

    return {
      verseNum,
      text,
    };
  });
}

function generateSampleChapters(bookName: string, testament: 'OT' | 'NT', chapterCount: number) {
  return Array.from({ length: chapterCount }, (_, i) => ({
    chapterNum: i + 1,
    verses: generateSampleVerses(bookName, testament, i + 1, 20 + Math.floor(Math.random() * 30)),
  }));
}

/**
 * DEPRECATED: Use loadCompleteBibleFromAPI() instead
 * Kept for backward compatibility, generates sample data with limited chapters
 */
export function generateSampleBibleData(): BibleBook[] {
  return BIBLE_BOOKS_METADATA.map((meta) => ({
    id: `${meta.testament}-${String(meta.bookNumber).padStart(2, '0')}`,
    testament: meta.testament,
    bookNumber: meta.bookNumber,
    bookName: meta.bookName,
    totalChapters: meta.totalChapters,
    chapters: generateSampleChapters(meta.bookName, meta.testament, Math.min(meta.totalChapters, 3)), // Limit to 3 chapters for demo
  }));
}

/**
 * Load complete Bible from API.Bible with ALL chapters and verses
 * Returns a Promise that resolves to the complete BibleBook array
 */
export async function loadCompleteBibleFromAPI(version: 'esv' | 'kjv' | 'niv' | 'nkjv' | 'nasb' | 'csb' = 'esv'): Promise<BibleBook[]> {
  // Dynamic import to avoid circular dependencies
  const { CompleteBibleLoader } = await import('../services/CompleteBibleLoader');
  return CompleteBibleLoader.loadCompleteBible(version);
}

export const BIBLE_BOOKS_LIST = BIBLE_BOOKS_METADATA;
