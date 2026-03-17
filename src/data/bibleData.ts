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
  { book: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
  { book: 'Exodus', chapter: 20, verse: 1, text: 'And God spoke all these words, saying, "I am the Lord your God."' },
  { book: 'Leviticus', chapter: 19, verse: 18, text: 'Love your neighbor as yourself. All the Law and the Prophets hang on these two commandments.' },
  { book: 'Numbers', chapter: 6, verse: 24, text: 'The Lord bless you and keep you; the Lord make his face to shine upon you.' },
  { book: 'Deuteronomy', chapter: 6, verse: 5, text: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' },
  { book: 'Joshua', chapter: 1, verse: 8, text: 'Keep this Book of the Law always on your lips; meditate on it day and night.' },
  { book: 'Judges', chapter: 6, verse: 14, text: 'The Lord turned to him and said, "Go in the strength you have and save Israel."' },
  { book: 'Ruth', chapter: 3, verse: 11, text: 'All the people of my town know that you are a woman of noble character.' },
  { book: '1 Samuel', chapter: 16, verse: 7, text: 'The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.' },
  { book: '2 Samuel', chapter: 22, verse: 31, text: 'As for God, his way is perfect: The Lord\'s word is flawless.' },
  { book: '1 Kings', chapter: 3, verse: 12, text: 'I will give you a wise and discerning heart, so that there will never have been anyone like you.' },
  { book: '2 Kings', chapter: 2, verse: 11, text: 'As they were walking along and talking together, suddenly a chariot of fire appeared.' },
  { book: '1 Chronicles', chapter: 16, verse: 11, text: 'Look to the Lord and his strength; seek his face always.' },
  { book: '2 Chronicles', chapter: 7, verse: 14, text: 'If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven.' },
  { book: 'Ezra', chapter: 7, verse: 10, text: 'For Ezra had devoted himself to the study and observance of the Law of the Lord.' },
  { book: 'Nehemiah', chapter: 8, verse: 8, text: 'They read from the Book of the Law of God, making it clear and giving the meaning so that the people understood what was being read.' },
  { book: 'Esther', chapter: 4, verse: 14, text: 'For if you remain silent at this time, relief and deliverance for the Jews will arise from another place.' },
  { book: 'Job', chapter: 19, verse: 25, text: 'I know that my redeemer lives, and that in the end he will stand on the earth.' },
  { book: 'Psalms', chapter: 23, verse: 1, text: 'The Lord is my shepherd, I lack nothing.' },
  { book: 'Proverbs', chapter: 9, verse: 10, text: 'The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.' },
  { book: 'Ecclesiastes', chapter: 12, verse: 13, text: 'Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the whole duty of humankind.' },
  { book: 'Isaiah', chapter: 40, verse: 31, text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.' },
  { book: 'Jeremiah', chapter: 29, verse: 11, text: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.' },
  { book: 'Lamentations', chapter: 3, verse: 22, text: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail.' },
  { book: 'Ezekiel', chapter: 36, verse: 26, text: 'I will give you a new heart and put a new spirit in you.' },
  { book: 'Daniel', chapter: 6, verse: 10, text: 'Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed.' },
  { book: 'Hosea', chapter: 6, verse: 6, text: 'For I desire mercy, not sacrifice, and acknowledgment of God rather than burnt offerings.' },
  { book: 'Joel', chapter: 2, verse: 28, text: 'And afterward, I will pour out my Spirit on all people.' },
  { book: 'Amos', chapter: 5, verse: 24, text: 'But let justice roll on like a river, righteousness like a never-failing stream!' },
  { book: 'Obadiah', chapter: 1, verse: 3, text: 'The pride of your heart has deceived you.' },
  { book: 'Jonah', chapter: 2, verse: 10, text: 'And the Lord commanded the fish, and it vomited Jonah onto dry land.' },
  { book: 'Micah', chapter: 6, verse: 8, text: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.' },
  { book: 'Nahum', chapter: 1, verse: 7, text: 'The Lord is good, a refuge in times of trouble.' },
  { book: 'Habakkuk', chapter: 2, verse: 4, text: 'See, the enemy is puffed up; his desires are not upright—but the righteous person will live by their faithfulness.' },
  { book: 'Zephaniah', chapter: 3, verse: 17, text: 'The Lord your God is with you, the Mighty Warrior who saves.' },
  { book: 'Haggai', chapter: 2, verse: 4, text: 'But now be strong, Zerubbabel\', declares the Lord. \'Be strong, Joshua son of Jozadak, the high priest. Be strong, all you people of the land\', declares the Lord.' },
  { book: 'Zechariah', chapter: 2, verse: 8, text: 'For this is what the Lord Almighty says: "After the Glorious One has sent me against the nations that have plundered you—for whoever touches you touches the apple of his eye."' },
  { book: 'Malachi', chapter: 3, verse: 10, text: 'Bring the whole tithe into the storehouse that there may be food in my house.' },
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

export const BIBLE_BOOKS_LIST = BIBLE_BOOKS_METADATA;
