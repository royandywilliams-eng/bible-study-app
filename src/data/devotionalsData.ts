import type { Devotional } from '../services/DevotionalsService';

// Sample devotionals covering the full year
// Using month-day format (MM-DD) so they repeat yearly
export const DEVOTIONALS_DATA: Devotional[] = [
  // January - New Testament Focus (Beginner level)
  {
    id: '01-01',
    date: 'January 1',
    title: 'New Beginnings',
    passages: ['Genesis 1:1-3', 'John 1:1-5'],
    dailyReading:
      'In the beginning God created the heavens and the earth. These profound words open Scripture with a declaration of God\'s creative power and authority. As you start this new year, remember that just as God created order from nothing, He can bring purpose and direction to your life. The Gospel of John echoes this theme, revealing that the Word through which all things were made became flesh and dwelt among us. Whether you\'re starting a new year, a new chapter, or a fresh commitment to faith, take heart: the same God who created the universe is present with you, ready to work in your life.',
    reflection: 'What does "new" mean to you spiritually?',
    prompts: [
      'How can you embrace new beginnings this year?',
      'What areas of your life need God\'s renewal?',
      'Write about a time God gave you a fresh start.'
    ],
    difficulty: 'beginner',
    tags: ['creation', 'new-year', 'hope', 'new-testament']
  },

  {
    id: '01-02',
    date: 'January 2',
    title: 'The Light of the World',
    passages: ['John 1:4-9', 'Matthew 5:14-16'],
    dailyReading:
      'In Him was life, and that life was the light of all mankind. Light is a powerful biblical metaphor for truth, guidance, and salvation. In a world often filled with spiritual darkness—confusion, doubt, fear—Jesus came as the light to illuminate our path. Matthew reminds us that we, too, are called to be lights in this world, reflecting the light of Christ to those around us. Your faith is not meant to be hidden but to shine brightly, drawing others toward truth and hope.',
    reflection: 'How can you be a light in your sphere of influence?',
    prompts: [
      'Where do you see spiritual darkness in the world?',
      'How does Christ\'s light illuminate your own struggles?',
      'What practical ways can you shine Christ\'s light today?'
    ],
    difficulty: 'beginner',
    tags: ['light', 'witness', 'new-testament', 'purpose']
  },

  {
    id: '01-03',
    date: 'January 3',
    title: 'God Knows Your Name',
    passages: ['Exodus 33:17', 'Isaiah 43:1'],
    dailyReading:
      'The Lord replied, "I will cause all my goodness to pass in front of you, and I will proclaim my name, the Lord, in your hearing." One of the most comforting truths in Scripture is that God knows you—personally and completely. He knows your name. In biblical culture, a name represented one\'s essence, purpose, and identity. When God says He knows your name, He\'s saying He knows the real you—your hopes, fears, and deepest needs. Isaiah echoes this promise: you have been called by name and belong to God. In a world where you might feel lost, forgotten, or insignificant, remember: the Creator of the universe knows you intimately.',
    reflection: 'What does it mean that God knows your name?',
    prompts: [
      'How does God\'s personal knowledge of you change your self-perception?',
      'When have you felt truly known by God?',
      'How can this truth comfort you in difficult times?'
    ],
    difficulty: 'beginner',
    tags: ['identity', 'god-presence', 'comfort', 'old-testament']
  },

  {
    id: '01-04',
    date: 'January 4',
    title: 'The Gift of Forgiveness',
    passages: ['1 John 1:8-9', 'Psalm 103:11-12'],
    dailyReading:
      'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness. Forgiveness is not earned; it\'s a gift. Many struggle with guilt and shame over past mistakes, but the Bible promises complete forgiveness through Christ. When you confess your sins—acknowledge them honestly before God—you don\'t stand before a harsh judge. Instead, you meet a loving Father who desires your restoration. As far as the east is from the west, your sins are removed. This doesn\'t minimize sin\'s seriousness, but rather demonstrates God\'s grace.',
    reflection: 'What does forgiveness mean in your spiritual journey?',
    prompts: [
      'Is there sin or shame you need to confess?',
      'How does the promise of forgiveness affect your relationship with God?',
      'How can you extend this same grace to others?'
    ],
    difficulty: 'beginner',
    tags: ['forgiveness', 'grace', 'redemption', 'new-testament']
  },

  {
    id: '01-05',
    date: 'January 5',
    title: 'Following Jesus',
    passages: ['Matthew 4:18-20', 'John 21:22'],
    dailyReading:
      '"Come, follow me," Jesus said. These simple words changed fishermen into apostles and continue to call people to discipleship today. Following Jesus isn\'t about perfection; it\'s about direction. It means gradually aligning your life with His values, His love, and His mission. In John 21, after His resurrection, Jesus gently redirects Peter\'s focus: "What is that to you? You follow me." This reminds us that discipleship is personal. Your path may look different from others\' paths, but the call is the same: follow Jesus.',
    reflection: 'What does following Jesus look like in your daily life?',
    prompts: [
      'What has Jesus called you away from?',
      'Where is He leading you now?',
      'What would radical commitment to following Jesus mean for you?'
    ],
    difficulty: 'beginner',
    tags: ['discipleship', 'faith', 'new-testament', 'calling']
  },

  // February - Old Testament Stories (Intermediate)
  {
    id: '02-01',
    date: 'February 1',
    title: 'Abraham\'s Faith',
    passages: ['Genesis 12:1-4', 'Hebrews 11:8-10'],
    dailyReading:
      'Abram believed the Lord, and he credited it to him as righteousness. Abraham\'s journey began with a radical act of faith. God told him to leave everything familiar—his land, his family, his security—and go to a place he\'d never seen. Without GPS, without guarantees, without seeing the promised land, Abraham obeyed. This is what faith looks like: trust despite uncertainty. Abraham didn\'t have all the answers, but he had the answer to the most important question: Will I trust God? His faith wasn\'t blind or foolish; it was grounded in his relationship with God.',
    reflection: 'What is God asking you to trust Him for?',
    prompts: [
      'Where do you struggle with uncertainty?',
      'What would it look like to trust God like Abraham did?',
      'What fears stand between you and complete trust?'
    ],
    difficulty: 'intermediate',
    tags: ['faith', 'trust', 'old-testament', 'obedience']
  },

  {
    id: '02-02',
    date: 'February 2',
    title: 'The Power of Prayer',
    passages: ['1 Samuel 1:10-11', '1 Thessalonians 5:16-18'],
    dailyReading:
      'In her deep anguish, Hannah wept much and prayed to the Lord. Prayer is not just reciting words; it\'s honest conversation with God. Hannah came before God with her pain, her longing, her tears. She didn\'t hide her emotions or pretend everything was fine. And God heard her. Throughout Scripture, we see people bringing their real struggles, not polished prayers, to God. Paul encourages us to rejoice, to pray in all circumstances, and to give thanks. This doesn\'t mean ignoring pain but integrating it into a life of ongoing communication with God.',
    reflection: 'How honest are you in your prayers?',
    prompts: [
      'What are you afraid to ask God for?',
      'When have you experienced God\'s response to prayer?',
      'How can you develop a more authentic prayer life?'
    ],
    difficulty: 'intermediate',
    tags: ['prayer', 'communication', 'vulnerability', 'old-testament']
  },

  {
    id: '02-03',
    date: 'February 3',
    title: 'David\'s Courage',
    passages: ['1 Samuel 17:45-47', 'Psalm 27:1'],
    dailyReading:
      '"You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty," David declared as he faced Goliath. This young shepherd boy didn\'t have armor or experience, but he had something more powerful: trust in God. Courage doesn\'t mean the absence of fear; it means acting despite fear, grounded in faith. David\'s courage came from his past experiences with God—remembering how God had delivered him from lions and bears. As you face your own "giants," remember: God has proven faithful before.',
    reflection: 'What giants are you facing?',
    prompts: [
      'Where do you need courage right now?',
      'How can past faithfulness of God strengthen you today?',
      'What does faith-based courage look like in practice?'
    ],
    difficulty: 'intermediate',
    tags: ['courage', 'faith', 'strength', 'old-testament']
  },

  {
    id: '02-04',
    date: 'February 4',
    title: 'Seeking Wisdom',
    passages: ['Proverbs 3:5-6', 'James 1:5'],
    dailyReading:
      'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He will make your paths straight. Wisdom is different from knowledge. Knowledge is information; wisdom is knowing how to apply it. The Bible promises that if you lack wisdom, you can ask God, who gives generously. This doesn\'t mean God will reveal His entire plan at once. Rather, He invites you to trust Him with the parts you don\'t understand, while moving forward with the next step He has shown you.',
    reflection: 'Where do you need God\'s wisdom most?',
    prompts: [
      'What decisions are you wrestling with?',
      'How have you seen God\'s wisdom prove true?',
      'What does it look like to trust Him with the unknown?'
    ],
    difficulty: 'intermediate',
    tags: ['wisdom', 'guidance', 'trust', 'old-testament']
  },

  {
    id: '02-05',
    date: 'February 5',
    title: 'The Suffering Servant',
    passages: ['Isaiah 53:4-6', '1 Peter 2:24-25'],
    dailyReading:
      'Surely he took up our pain and bore our suffering. These words from Isaiah, written centuries before Christ, describe the nature of Jesus\' work on the cross. Jesus didn\'t come to avoid suffering; He came through suffering to bring redemption. He took upon Himself the pain and guilt that belong to us. Understanding this—that Jesus bore our shame, our sickness, our separation from God—should transform how we view suffering and sacrifice. His suffering wasn\'t accidental or meaningless; it was redemptive.',
    reflection: 'How does Christ\'s suffering affect your faith?',
    prompts: [
      'What does substitutionary atonement mean to you?',
      'How should gratitude for the cross shape your daily life?',
      'How can you share this hope with others?'
    ],
    difficulty: 'intermediate',
    tags: ['christ', 'redemption', 'sacrifice', 'old-testament']
  },

  // March - Gospel Stories (Beginner)
  {
    id: '03-01',
    date: 'March 1',
    title: 'Born Again',
    passages: ['John 3:1-7', '2 Corinthians 5:17'],
    dailyReading:
      'You must be born again. These words to Nicodemus, a respected religious teacher, were shocking. Yet Jesus made clear that religion, good works, and knowledge aren\'t enough. True faith is a transformation as fundamental as being born. When you give your life to Christ, you\'re not just adding to your life; you\'re entering a new life. Old ways of thinking, old identities, old shame—all can be left behind. This isn\'t earned through effort; it\'s received through faith. You become a new creation.',
    reflection: 'What does spiritual rebirth mean to you?',
    prompts: [
      'What old ways are you being called to leave behind?',
      'How are you becoming a new creation in Christ?',
      'What does it mean practically to be "born again"?'
    ],
    difficulty: 'beginner',
    tags: ['salvation', 'transformation', 'faith', 'new-testament']
  },

  {
    id: '03-02',
    date: 'March 2',
    title: 'The Woman at the Well',
    passages: ['John 4:4-15', 'John 4:25-26'],
    dailyReading:
      'A Samaritan woman came to draw water. Jesus asked her for a drink. This simple encounter changed her life. In Jewish culture, Samaritans were despised, women were often dismissed, and her particular status as a divorced woman made her doubly marginalized. Yet Jesus sought her out, spoke with her, and offered her "living water"—eternal life and spiritual fulfillment. His conversation with her wasn\'t about judgment; it was about love and transformation. What the religious establishment rejected, Jesus embraced and valued.',
    reflection: 'Do you feel known and valued by Jesus?',
    prompts: [
      'What makes you feel unworthy of God\'s love?',
      'How has Jesus met you in your "wells"—places of need?',
      'How can you offer this same acceptance to others?'
    ],
    difficulty: 'beginner',
    tags: ['acceptance', 'belonging', 'new-testament', 'love']
  },

  {
    id: '03-03',
    date: 'March 3',
    title: 'The Beatitudes',
    passages: ['Matthew 5:3-12'],
    dailyReading:
      'Blessed are the poor in spirit, for theirs is the kingdom of heaven. The Beatitudes seem backward by worldly standards. Jesus blessed the spiritually bankrupt, the mourning, the meek—those society considers weak or unsuccessful. Yet in God\'s kingdom, these become the recipients of His greatest gifts. The poor in spirit recognize their need for God. The mourning find comfort. The meek inherit the earth. This isn\'t about earning blessing through negative circumstances; it\'s about how God meets us in our vulnerability and transforms it.',
    reflection: 'Which beatitude speaks most powerfully to you?',
    prompts: [
      'Where do you need to acknowledge spiritual poverty?',
      'How does God\'s blessing differ from worldly success?',
      'What blessings has God given you through weakness?'
    ],
    difficulty: 'beginner',
    tags: ['blessing', 'values', 'kingdom', 'new-testament']
  },

  {
    id: '03-04',
    date: 'March 4',
    title: 'Love Your Enemies',
    passages: ['Matthew 5:43-48', 'Luke 6:35-36'],
    dailyReading:
      'But I tell you, love your enemies and pray for those who persecute you. This teaching stands in stark contrast to our natural instincts. Yet Jesus calls His followers to transcend natural impulses and reflect God\'s nature. God\'s love isn\'t reserved for friends; it extends to enemies. This doesn\'t mean liking everyone or staying in harmful relationships. Rather, it means refusing to harbor hatred, praying for the best in others, and trusting God with justice and redemption.',
    reflection: 'Who is difficult for you to love?',
    prompts: [
      'What would it mean to pray blessings on someone who hurt you?',
      'How does God\'s love transform enemies?',
      'Where in your life is this love being tested?'
    ],
    difficulty: 'beginner',
    tags: ['love', 'enemies', 'grace', 'new-testament']
  },

  {
    id: '03-05',
    date: 'March 5',
    title: 'The Good Samaritan',
    passages: ['Luke 10:25-37'],
    dailyReading:
      'Which of these three do you think was a neighbor to the man who fell into the hands of robbers? This parable challenges our definitions of community and compassion. The priest and Levite—the religious—passed by the suffering man. The Samaritan—despised by Jewish society—stopped and cared for him. Jesus redefines "neighbor" beyond cultural or ethnic boundaries. Your neighbor is anyone in need that you encounter. True faith expresses itself in concrete acts of mercy.',
    reflection: 'Who has God placed in your path that needs help?',
    prompts: [
      'When have you been the one in need?',
      'What stops you from helping others sometimes?',
      'How can you be a "good Samaritan" this week?'
    ],
    difficulty: 'beginner',
    tags: ['compassion', 'mercy', 'service', 'new-testament']
  },

  // Adding more sample devotionals to reach variety
  {
    id: '06-01',
    date: 'June 1',
    title: 'The Holy Spirit',
    passages: ['John 14:26', 'Romans 8:26-27'],
    dailyReading:
      'But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things. After Jesus\' ascension, He didn\'t leave His followers as orphans. Instead, He sent the Holy Spirit to guide, comfort, and empower them. The Spirit intercedes for us, teaches us truth, and gives us power for daily living. Many believers underestimate the role of the Holy Spirit, yet He\'s essential to the Christian life—our helper in prayer, our guide into truth, and our source of spiritual gifts.',
    reflection: 'How aware are you of the Holy Spirit\'s presence?',
    prompts: [
      'Where do you need the Spirit\'s help right now?',
      'How has the Holy Spirit guided you?',
      'What gifts has the Spirit given you to use?'
    ],
    difficulty: 'intermediate',
    tags: ['holy-spirit', 'guidance', 'power', 'new-testament']
  },

  {
    id: '09-01',
    date: 'September 1',
    title: 'The Incarnation',
    passages: ['John 1:14', '1 Timothy 3:16'],
    dailyReading:
      'The Word became flesh and made his dwelling among us. At the heart of Christianity is this stunning claim: God became human. Not as an illusion or temporary visit, but genuinely, fully human while remaining fully God. Jesus experienced hunger, tiredness, pain, and temptation—yet without sin. This demonstrates God\'s commitment to understanding our human condition and His willingness to identify with us completely. The incarnation means God isn\'t distant; He\'s walked where we walk.',
    reflection: 'What does it mean that God became human?',
    prompts: [
      'How does Christ\'s humanity comfort you?',
      'What does incarnational faith look like today?',
      'How should this truth change your faith and service?'
    ],
    difficulty: 'advanced',
    tags: ['christ', 'incarnation', 'theology', 'new-testament']
  },

  {
    id: '12-01',
    date: 'December 1',
    title: 'Hope in Darkness',
    passages: ['Isaiah 9:2', 'Luke 1:78-79'],
    dailyReading:
      'The people walking in darkness have seen a great light. As winter darkness deepens, Christians remember that Christ came as the light of the world. The season reminds us that even in our darkest moments—grief, despair, loneliness, fear—hope remains. Jesus didn\'t come in worldly power or glory but as a vulnerable baby, yet He brought the greatest light. No darkness is too deep for His light to penetrate.',
    reflection: 'Where do you need Christ\'s light right now?',
    prompts: [
      'What darkness are you walking through?',
      'How has Christ been your light?',
      'How can you share His light with others in darkness?'
    ],
    difficulty: 'beginner',
    tags: ['hope', 'light', 'christmas', 'new-testament']
  }
];

// Helper function to generate the remaining devotionals (to reach 365 total)
// This ensures we have complete coverage without manually writing all 365
export function generateCompleteDevotonalsData(): Devotional[] {
  const baseDevotionals = [...DEVOTIONALS_DATA];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Fill in missing days with generated devotionals
  for (let month = 0; month < 12; month++) {
    const monthName = months[month];
    const days = daysPerMonth[month];
    const monthNum = String(month + 1).padStart(2, '0');

    for (let day = 1; day <= days; day++) {
      const dayNum = String(day).padStart(2, '0');
      const id = `${monthNum}-${dayNum}`;

      // Skip if already exists
      if (baseDevotionals.some(d => d.id === id)) {
        continue;
      }

      // Generate a devotional for this day
      const difficulty =
        month < 4
          ? 'beginner'
          : month < 8
          ? 'intermediate'
          : 'advanced';

      const devotional: Devotional = {
        id,
        date: `${monthName} ${day}`,
        title: `Day ${day} of ${monthName}`,
        passages: generatePassages(month, day),
        dailyReading: `Today we reflect on God's faithfulness and His eternal promises. As you navigate life's challenges and celebrate its joys, remember that God is present in every moment. His character remains consistent, His love unwavering, and His purpose for your life continues to unfold.`,
        reflection: 'How have you seen God at work in your life recently?',
        prompts: [
          'What does God\'s faithfulness mean in your current circumstances?',
          'How can you trust Him more completely?',
          'What will you choose to surrender to His care today?'
        ],
        difficulty,
        tags: ['faith', 'trust', 'daily', 'scripture']
      };

      baseDevotionals.push(devotional);
    }
  }

  return baseDevotionals;
}

function generatePassages(month: number, day: number): string[] {
  // Generate relevant passages based on month
  const passages = [
    ['Genesis', 'Exodus', 'Psalm', 'Matthew'],
    ['Leviticus', 'Numbers', 'Proverbs', 'Mark'],
    ['Deuteronomy', 'Joshua', 'Song of Songs', 'Luke'],
    ['Judges', 'Ruth', 'Isaiah', 'John'],
    ['1 Samuel', '2 Samuel', 'Jeremiah', 'Acts'],
    ['1 Kings', '2 Kings', 'Lamentations', 'Romans'],
    ['1 Chronicles', '2 Chronicles', 'Ezekiel', '1 Corinthians'],
    ['Ezra', 'Nehemiah', 'Daniel', '2 Corinthians'],
    ['Job', 'Psalms', 'Hosea', 'Galatians'],
    ['Ecclesiastes', 'Isaiah', 'Joel', 'Ephesians'],
    ['Jeremiah', 'Lamentations', 'Amos', 'Philippians'],
    ['Ezekiel', 'Daniel', 'Obadiah', 'Colossians']
  ];

  const bookList = passages[month] || ['Psalm', 'Matthew', 'John'];
  const chap = ((day % 3) + 1);
  const verse = ((day % 5) + 1);

  return [
    `${bookList[0]} ${chap}:${verse}`,
    `${bookList[month % bookList.length]} ${chap + 1}:${verse + 1}`
  ];
}
