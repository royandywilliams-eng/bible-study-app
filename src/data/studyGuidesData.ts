import type { StudyGuide } from '../services/StudyGuidesService';

// Gospel Basics Course - 8 weeks, Beginner Level
const GOSPEL_BASICS: StudyGuide = {
  id: 'gospel-basics',
  title: 'Gospel Basics',
  description: 'Explore the life and teachings of Jesus through all four Gospels. Understand the core message of salvation and how each Gospel uniquely presents Christ to different audiences.',
  difficulty: 'beginner',
  weeks: 8,
  estimatedHours: 12,
  syllabus: 'This 8-week course introduces you to the four Gospels and the essential message of Jesus. Each week focuses on a different Gospel\'s unique perspective on the life, death, and resurrection of Christ.',
  tags: ['gospel', 'jesus', 'new-testament', 'fundamentals'],
  learningObjectives: [
    'Understand the historical context and authorship of each Gospel',
    'Identify how Matthew, Mark, Luke, and John present Jesus uniquely',
    'Grasp the central message of Jesus\' life and ministry',
    'Learn the importance of the death and resurrection',
    'Apply Gospel teachings to your personal faith journey'
  ],
  lessons: [
    {
      id: 'gospel-basics-week1',
      weekNumber: 1,
      title: 'Matthew\'s Gospel: Jesus the Messiah',
      objectives: [
        'Understand Matthew\'s focus on Jesus as the promised Messiah',
        'Learn about the historical context of Matthew\'s Jewish audience',
        'Identify key messianic prophecy fulfillment',
        'Understand the structure and themes of Matthew\'s Gospel'
      ],
      passages: ['Matthew 1:1-4:25', 'Matthew 23:1-39', 'Matthew 28:1-20'],
      content: `Matthew\'s Gospel presents Jesus as the long-awaited Messiah of Israel. Written primarily for a Jewish audience, Matthew emphasizes how Jesus fulfills Old Testament prophecies and is the fulfillment of Israel\'s hopes. The Gospel opens with a genealogy connecting Jesus to Abraham and David, establishing His messianic credentials. Matthew structures his Gospel around five major teaching sections (the Sermon on the Mount, parables about the kingdom, disciples\' instructions, community disputes, and end times), each following a narrative section. This structure reflects how Matthew wants his readers to understand Jesus not just as a historical figure, but as the supreme teacher and revealer of God\'s kingdom. Matthew uniquely emphasizes Jesus\' authority, His role as judge, and the universality of salvation—not just for Jews but for all nations.`,
      keyTakeaways: [
        'Matthew emphasizes Jesus as the Messiah promised in the Old Testament',
        'The Sermon on the Mount (Matthew 5-7) contains Jesus\' core ethical teachings',
        'Matthew structures his Gospel around Jesus\' teachings, not just events',
        'Jesus\' resurrection launches the mission to all nations'
      ],
      reflection: 'How does Matthew\'s portrayal of Jesus as Messiah deepen your understanding of who Jesus is?',
      resources: ['Bible reading: Matthew 1-7', 'Reflection on messianic prophecies'],
      quiz: {
        id: 'gospel-basics-week1-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q1-1',
            type: 'multiple-choice',
            question: 'Which Old Testament figure does Matthew emphasize in Jesus\' genealogy?',
            options: ['Moses', 'Abraham and David', 'Joshua', 'Solomon'],
            correctAnswer: 1,
            explanation: 'Matthew opens his Gospel by connecting Jesus to Abraham (father of Israel) and David (the great king), emphasizing His messianic credentials.',
            passageReference: 'Matthew 1:1-17'
          },
          {
            id: 'q1-2',
            type: 'multiple-choice',
            question: 'How many major teaching sections does Matthew organize in his Gospel?',
            options: ['Three', 'Four', 'Five', 'Seven'],
            correctAnswer: 2,
            explanation: 'Matthew structures his Gospel around five major teaching sections, each followed by a narrative section, emphasizing Jesus as the supreme teacher.',
            passageReference: 'Matthew 5-7, 10, 13, 18, 24-25'
          },
          {
            id: 'q1-3',
            type: 'true-false',
            question: 'Matthew emphasizes that the Great Commission is only for the Jewish nation.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Matthew stresses that the Gospel is for all nations. Jesus\' final command is to go to "all nations," showing the universal scope of salvation.',
            passageReference: 'Matthew 28:19-20'
          }
        ]
      }
    },
    {
      id: 'gospel-basics-week2',
      weekNumber: 2,
      title: 'Mark\'s Gospel: Jesus the Action-Packed Servant',
      objectives: [
        'Understand Mark\'s focus on Jesus as a servant in action',
        'Learn Mark\'s fast-paced narrative style',
        'Understand the theme of messianic secrecy',
        'Learn how Mark emphasizes Jesus\' suffering and sacrifice'
      ],
      passages: ['Mark 1:1-3:35', 'Mark 10:45', 'Mark 15:1-39'],
      content: `Mark\'s Gospel is the shortest and most action-packed account of Jesus\' life. Written for a Roman (likely Gentile) audience, Mark emphasizes Jesus as the powerful, decisive servant who acts with authority. The Gospel moves rapidly from one event to another, using the word "immediately" frequently to create a sense of urgency and momentum. A key theme in Mark is the "messianic secret"—Jesus repeatedly tells people not to reveal His identity, and even His disciples struggle to understand who He truly is. This creates tension throughout the Gospel: Jesus\' miracles and teachings demonstrate His divine power, yet He consistently identifies Himself as the suffering servant who must die for humanity. Mark culminates with Jesus\' crucifixion, emphasizing that true greatness in God\'s kingdom comes through humble service and sacrificial love. For Roman readers facing persecution, Mark\'s portrait of Jesus as a suffering servant offered comfort and encouragement.`,
      keyTakeaways: [
        'Mark emphasizes Jesus as a powerful servant in constant action',
        'The "messianic secret" reveals Jesus\' identity gradually',
        'Mark stresses that greatness means serving others',
        'Jesus\' suffering and death are central to His mission'
      ],
      reflection: 'What does it mean to you that Jesus came as a servant rather than a conquering king?',
      resources: ['Bible reading: Mark 1-5', 'Reflection on Mark 10:45 and servant leadership'],
      quiz: {
        id: 'gospel-basics-week2-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q2-1',
            type: 'multiple-choice',
            question: 'What does the "messianic secret" in Mark\'s Gospel refer to?',
            options: [
              'A hidden code in the Gospel that reveals Jesus\' identity',
              'Jesus repeatedly telling people not to reveal His identity',
              'A secret location where Jesus trained His disciples',
              'An ancient prophecy about Jesus\' birth'
            ],
            correctAnswer: 1,
            explanation: 'The messianic secret is Mark\'s literary device where Jesus asks those who witness His miracles to keep His identity secret, creating suspense about who He truly is.',
            passageReference: 'Mark 1:44, 3:12, 7:36'
          },
          {
            id: 'q2-2',
            type: 'multiple-choice',
            question: 'According to Mark 10:45, what is Jesus\' primary purpose?',
            options: [
              'To establish a political kingdom',
              'To teach moral philosophy',
              'To serve and give His life as a ransom for many',
              'To challenge the Roman government'
            ],
            correctAnswer: 2,
            explanation: 'Jesus explicitly states that the Son of Man came "not to be served, but to serve, and to give his life as a ransom for many," emphasizing His sacrificial mission.',
            passageReference: 'Mark 10:45'
          },
          {
            id: 'q2-3',
            type: 'true-false',
            question: 'Mark\'s Gospel emphasizes that Jesus\' resurrection is His greatest achievement.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'While Mark does include the resurrection, he emphasizes Jesus\' sacrificial death as central to His identity and mission.',
            passageReference: 'Mark 15:39'
          }
        ]
      }
    },
    {
      id: 'gospel-basics-week3',
      weekNumber: 3,
      title: 'Luke\'s Gospel: Jesus the Compassionate Friend',
      objectives: [
        'Understand Luke\'s emphasis on Jesus\' compassion and inclusivity',
        'Learn Luke\'s historical approach to Gospel writing',
        'Understand the role of the Holy Spirit in Luke',
        'Learn how Luke emphasizes grace and salvation for all'
      ],
      passages: ['Luke 1:1-4:13', 'Luke 15:1-32', 'Luke 24:1-53'],
      content: `Luke\'s Gospel presents Jesus as the compassionate savior who extends grace and mercy to the marginalized, outsiders, and sinners. Written for a Gentile (likely Greek) audience, Luke emphasizes Jesus\' humanity and emotional warmth. Luke opens his Gospel with a preface claiming historical accuracy—he investigated eyewitness accounts and wrote an orderly narrative, making him the most "literary" Gospel. Luke has a strong emphasis on the Holy Spirit, mentioning the Spirit more frequently than the other Gospels. Throughout Luke\'s narrative, Jesus breaks social barriers: He eats with tax collectors, speaks to women and Samaritans, and welcomes the poor and marginalized. Luke includes unique parables that emphasize grace and forgiveness—the parable of the prodigal son, the tax collector and the Pharisee, and the good Samaritan—all highlighting God\'s inclusive love. Luke also emphasizes prayer, inclusion of women, and joy in salvation. For Luke\'s primarily Gentile audience, this portrait of Jesus demolished any walls of exclusion.`,
      keyTakeaways: [
        'Luke emphasizes Jesus\' compassion for the marginalized and outcast',
        'Luke claims to write with historical accuracy based on eyewitness accounts',
        'The Holy Spirit plays a central role in Luke\'s narrative',
        'Grace and forgiveness are available to all people, not just the righteous'
      ],
      reflection: 'How does Luke\'s portrayal of Jesus\' compassion challenge your understanding of who belongs in God\'s kingdom?',
      resources: ['Bible reading: Luke 15', 'Reflection on Luke 19:10 and Jesus\' mission'],
      quiz: {
        id: 'gospel-basics-week3-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q3-1',
            type: 'multiple-choice',
            question: 'What is Luke\'s stated purpose in writing his Gospel?',
            options: [
              'To prove Jesus is the Messiah',
              'To provide an orderly, historical account for investigation',
              'To establish the church\'s hierarchy',
              'To combat heretical teachings'
            ],
            correctAnswer: 1,
            explanation: 'Luke explicitly states he investigated eyewitness accounts and wrote an orderly narrative so his reader (Theophilus) could have certainty about what he\'d been taught.',
            passageReference: 'Luke 1:1-4'
          },
          {
            id: 'q3-2',
            type: 'multiple-choice',
            question: 'Which of these unique parables emphasizes God\'s gracious love for sinners?',
            options: [
              'The sower',
              'The good Samaritan',
              'The prodigal son',
              'Both B and C'
            ],
            correctAnswer: 3,
            explanation: 'Luke uniquely includes the parables of the prodigal son and the good Samaritan, both emphasizing God\'s inclusive grace and radical love for outsiders and sinners.',
            passageReference: 'Luke 15:11-32, Luke 10:25-37'
          },
          {
            id: 'q3-3',
            type: 'true-false',
            question: 'Luke emphasizes the role of the Holy Spirit more than the other Gospels.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'Luke mentions the Holy Spirit more frequently than Matthew, Mark, or John, emphasizing the Spirit\'s role in Jesus\' ministry and the early church.',
            passageReference: 'Luke 1:35, 3:22, 4:1, 4:14'
          }
        ]
      }
    },
    {
      id: 'gospel-basics-week4',
      weekNumber: 4,
      title: 'John\'s Gospel: Jesus the Divine Word',
      objectives: [
        'Understand John\'s theological and philosophical approach',
        'Learn about the "logos" (Word) and its significance',
        'Understand John\'s "I am" statements',
        'Learn how John emphasizes belief and eternal life'
      ],
      passages: ['John 1:1-51', 'John 14:1-31', 'John 20:1-31'],
      content: `John\'s Gospel is distinctly different from the other three. While Matthew, Mark, and Luke present Jesus\' life chronologically with numerous miracles and parables, John focuses on theological reflection and profound spiritual truths. John opens not with Jesus\' birth but with the cosmic claim: "In the beginning was the Word, and the Word was with God, and the Word was God." This "logos" (Word) emphasizes Jesus as the divine expression of God Himself. John doesn\'t include many of Jesus\' parables; instead, he presents longer teaching discourses and dramatic encounters. John emphasizes Jesus\' divine nature through the famous "I am" statements: "I am the bread of life," "I am the light of the world," "I am the resurrection and the life," etc. These connect Jesus to God\'s self-revelation to Moses at the burning bush. John\'s Gospel is organized around seven miraculous signs and features extensive teaching by Jesus about belief, eternal life, and the relationship between God and His people. Written for a sophisticated, philosophically-minded audience, John invites deep meditation on Jesus\' true identity and transformative power.`,
      keyTakeaways: [
        'John presents Jesus as the divine Word (Logos) present from creation',
        'The "I am" statements reveal Jesus\' divine identity',
        'John emphasizes belief in Jesus as the path to eternal life',
        'John focuses on Jesus\' spiritual and theological significance more than narrative details'
      ],
      reflection: 'How does John\'s presentation of Jesus as the divine Word deepen your understanding of His identity?',
      resources: ['Bible reading: John 1, 14, 17', 'Reflection on John\'s "I am" statements'],
      quiz: {
        id: 'gospel-basics-week4-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q4-1',
            type: 'multiple-choice',
            question: 'What does "logos" (Word) mean in John 1:1?',
            options: [
              'A collection of Jesus\' sayings',
              'The divine expression and revelation of God',
              'A philosophical concept in Greek thought',
              'All of the above'
            ],
            correctAnswer: 3,
            explanation: 'Logos carries multiple meanings: it refers to Jesus as God\'s ultimate self-revelation, embodies philosophical concepts of divine reason, and encompasses Jesus\' teachings.',
            passageReference: 'John 1:1-14'
          },
          {
            id: 'q4-2',
            type: 'true-false',
            question: 'John\'s Gospel includes more parables than the other Gospels.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'John\'s Gospel actually includes very few parables. Instead, John emphasizes longer teaching discourses and the "I am" statements as ways to reveal Jesus\' identity.',
            passageReference: 'John 1-17'
          },
          {
            id: 'q4-3',
            type: 'multiple-choice',
            question: 'Which "I am" statement emphasizes Jesus\' power over death?',
            options: [
              '"I am the bread of life"',
              '"I am the door"',
              '"I am the resurrection and the life"',
              '"I am the vine"'
            ],
            correctAnswer: 2,
            explanation: 'In John 11:25-26, Jesus declares "I am the resurrection and the life," asserting His power over death itself.',
            passageReference: 'John 11:25-26'
          }
        ]
      }
    },
    {
      id: 'gospel-basics-week5',
      weekNumber: 5,
      title: 'The Death of Jesus: Why It Matters',
      objectives: [
        'Understand the historical context of Jesus\' crucifixion',
        'Learn theological interpretations of Jesus\' death',
        'Understand atonement and redemption',
        'Learn how Jesus\' death fulfills Old Testament prophecy'
      ],
      passages: ['Matthew 26-27', 'Isaiah 53:1-12', 'Romans 3:21-26'],
      content: `The crucifixion of Jesus stands at the heart of Christian faith. The Gospels describe Jesus\' arrest, trial before Pilate, and execution by crucifixion—a Roman method of capital punishment reserved for the worst criminals and rebels. Historically, this was a shocking, shameful end for someone claiming to be the Messiah. Yet Christian theology transformed this apparent defeat into humanity\'s greatest victory. The New Testament offers several interpretive frameworks for understanding Jesus\' death. The "substitution" model sees Jesus taking our punishment—bearing the weight of human sin so we don\'t have to. The "redemption" model views Jesus\' death as payment to free us from slavery to sin. The "moral influence" model emphasizes how Jesus\' sacrificial love inspires us to transformation. The "victory" model presents Jesus defeating evil and death through His resurrection. These aren\'t contradictory; they\'re complementary perspectives on a mystery that transforms us. Isaiah 53 prophetically describes a suffering servant whose death brings healing, directly connecting to Jesus. For early Christians facing persecution, Jesus\' death and resurrection provided hope that suffering could lead to victory and that death is not the final word.`,
      keyTakeaways: [
        'Jesus was crucified as a common criminal, yet Christianity transformed this into redemption',
        'Multiple biblical images help us understand Jesus\' death: payment, substitution, victory, healing',
        'Isaiah 53 prophetically describes Jesus as the suffering servant',
        'Jesus\' death demonstrates God\'s radical love and willingness to sacrifice for humanity'
      ],
      reflection: 'How does understanding the meaning of Jesus\' death change your relationship with Him?',
      resources: ['Bible reading: Matthew 26-27, Isaiah 53', 'Reflection on Romans 3:21-26'],
      quiz: {
        id: 'gospel-basics-week5-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q5-1',
            type: 'multiple-choice',
            question: 'According to Christian theology, why did Jesus die?',
            options: [
              'As a political martyr against Rome',
              'To pay the penalty for human sin and offer redemption',
              'As a moral example of courage',
              'To fulfill Old Testament prophecy only'
            ],
            correctAnswer: 1,
            explanation: 'While Jesus did fulfill prophecy and set a moral example, Christian theology emphasizes that Jesus\' death was redemptive—paying the penalty for sin and offering salvation.',
            passageReference: 'Romans 3:21-26, 1 Peter 2:24'
          },
          {
            id: 'q5-2',
            type: 'true-false',
            question: 'Isaiah 53 describes a suffering servant whose death brings healing.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'Isaiah 53 is one of the clearest Old Testament predictions of the Messiah as a suffering servant, directly connecting to Jesus\' death on the cross.',
            passageReference: 'Isaiah 53:5, 11'
          },
          {
            id: 'q5-3',
            type: 'multiple-choice',
            question: 'How do the Gospels describe Jesus\' execution?',
            options: [
              'As a peaceful, natural death',
              'As crucifixion, a shameful Roman execution',
              'As stoning by the Jewish authorities',
              'As a hidden, secret death'
            ],
            correctAnswer: 1,
            explanation: 'All four Gospels describe Jesus being crucified, a brutal Roman execution method that was shameful and represented defeat—yet Christianity transformed this into redemption.',
            passageReference: 'Matthew 27:32-56, Mark 15:20-41, Luke 23:26-49, John 19:16-37'
          }
        ]
      }
    },
    {
      id: 'gospel-basics-week6',
      weekNumber: 6,
      title: 'The Resurrection: Victory Over Death',
      objectives: [
        'Understand the historical accounts of Jesus\' resurrection',
        'Learn the significance of the resurrection for Christian faith',
        'Understand the resurrection body and eternal life',
        'Learn how the resurrection validates Jesus\' claims'
      ],
      passages: ['1 Corinthians 15:1-58', 'John 20:1-31', 'Romans 6:1-14'],
      content: `The resurrection of Jesus from the dead is the foundation of Christian faith. All four Gospels testify that Jesus, after being executed on Friday, rose from the dead on Sunday—the first day of the week, which became the Christian Sabbath. The accounts vary in details but agree on core facts: Jesus\' tomb was empty, and He appeared alive to His followers. The resurrection wasn\'t merely a spiritual or symbolic event; it was bodily and physical—Jesus could be touched and ate food—yet also transformed and transcendent. The apostle Paul calls the resurrection "the power of God" that demonstrates Jesus truly is Lord. The resurrection has several profound implications. First, it validates Jesus\' claims and demonstrates His power over death. Second, it breaks the power of sin and death for all believers—Paul writes "if Christ has been raised, then our resurrection is certain." Third, it inaugurates a new creation and God\'s renewing of all things. Fourth, it provides hope for believers facing death. The resurrection isn\'t just about Jesus going to heaven; it\'s about the renewal of creation itself. Christians believe in a future general resurrection when Christ returns and God transforms all things—not escaping to a spiritual realm but the restoration of physical, embodied life in a healed creation.`,
      keyTakeaways: [
        'Jesus rose bodily from the dead on the third day, central to Christian faith',
        'The resurrection demonstrates Jesus\' power and validates His claims',
        'The resurrection of Jesus guarantees the resurrection of believers',
        'The resurrection promises not escape from creation but its renewal and restoration'
      ],
      reflection: 'How does the resurrection change your perspective on death and eternal life?',
      resources: ['Bible reading: 1 Corinthians 15, John 20', 'Reflection on resurrection hope in times of difficulty'],
      quiz: {
        id: 'gospel-basics-week6-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q6-1',
            type: 'multiple-choice',
            question: 'What is the theological significance of Jesus\' resurrection?',
            options: [
              'It proves Jesus was a good moral teacher',
              'It demonstrates Jesus\' divine power and validates His claims',
              'It is merely a spiritual or symbolic event',
              'It only affects Jesus, not believers'
            ],
            correctAnswer: 1,
            explanation: 'The resurrection is not just a miracle; it demonstrates Jesus\' divine authority, breaks the power of death, and guarantees believers\' future resurrection.',
            passageReference: 'Romans 1:4, 1 Corinthians 15:54-57'
          },
          {
            id: 'q6-2',
            type: 'true-false',
            question: 'The resurrection body of Jesus was purely spiritual and had no physical reality.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'The Gospels emphasize the resurrection was bodily—Jesus ate food and could be touched—though also transformed and transcendent.',
            passageReference: 'Luke 24:42-43, John 20:19-29'
          },
          {
            id: 'q6-3',
            type: 'multiple-choice',
            question: 'According to Paul in 1 Corinthians 15, what does Christ\'s resurrection guarantee?',
            options: [
              'Only spiritual survival after death',
              'Our bodily resurrection and transformation',
              'That only the righteous will be saved',
              'The end of all suffering immediately'
            ],
            correctAnswer: 1,
            explanation: 'Paul explicitly teaches that because Christ has risen, believers will also be raised: "But Christ has indeed been raised from the dead, the firstfruits of those who have died."',
            passageReference: '1 Corinthians 15:20-23'
          }
        ]
      }
    },
    {
      id: 'gospel-basics-week7',
      weekNumber: 7,
      title: 'Jesus\' Teachings: The Sermon on the Mount',
      objectives: [
        'Understand the core ethical teachings of Jesus',
        'Learn about the Beatitudes and their meaning',
        'Understand Jesus\' radical reinterpretation of the law',
        'Apply Jesus\' teachings to daily Christian life'
      ],
      passages: ['Matthew 5:1-7:29', 'Luke 6:20-49'],
      content: `The Sermon on the Mount (Matthew 5-7) is Jesus\' most famous teaching block and perhaps the most influential ethical instruction in Western civilization. Jesus delivers these teachings to His disciples on a mountain, establishing a new standard for God\'s people. The Sermon begins with the Beatitudes—nine blessings pronounced on those who embody particular spiritual qualities: blessed are the poor in spirit, those who mourn, the meek, those who hunger for righteousness, the merciful, the pure in heart, the peacemakers, and those persecuted for righteousness\' sake. These aren\'t descriptions of comfortable, successful people; they\'re blessings on the humble, broken, and sacrificial. Jesus then teaches that His followers are "salt of the earth" and "light of the world"—they have a distinctive, visible impact on their communities. Jesus doesn\'t abolish the Old Testament law but deepens it. He argues that sin begins in the heart—anger is like murder, lust is like adultery. Jesus commands radical forgiveness ("turn the other cheek"), sacrificial generosity, and love for enemies. He teaches that authentic righteousness isn\'t about external religious performance (the criticism of the Pharisees) but internal transformation. The Sermon culminates with the Golden Rule: "Do to others what you would have them do to you." Jesus\' ethical vision isn\'t just about rules but about becoming transformed people who reflect God\'s character in their relationships.`,
      keyTakeaways: [
        'The Beatitudes teach that blessing comes through humility, sacrifice, and compassion',
        'Jesus deepens the law by addressing internal attitudes, not just external actions',
        'Jesus teaches radical forgiveness, love for enemies, and sacrificial generosity',
        'Authentic righteousness is internal transformation, not external performance'
      ],
      reflection: 'Which teachings from the Sermon on the Mount most challenge you, and how will you apply them?',
      resources: ['Bible reading: Matthew 5-7', 'Reflection on the Beatitudes and how they apply to your life'],
      quiz: {
        id: 'gospel-basics-week7-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q7-1',
            type: 'multiple-choice',
            question: 'According to the Beatitudes, who are considered "blessed"?',
            options: [
              'The wealthy and successful',
              'The proud and powerful',
              'The poor in spirit, merciful, and peacemakers',
              'Those who follow religious rules perfectly'
            ],
            correctAnswer: 2,
            explanation: 'The Beatitudes pronounce blessings on the humble, broken, merciful, pure-hearted, and peacemakers—not on the powerful or successful.',
            passageReference: 'Matthew 5:3-12'
          },
          {
            id: 'q7-2',
            type: 'true-false',
            question: 'Jesus teaches that anger and murder are equally serious sins.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'Jesus argues that sin begins in the heart, so anger and contempt are spiritually serious even if they don\'t result in physical murder.',
            passageReference: 'Matthew 5:21-26'
          },
          {
            id: 'q7-3',
            type: 'multiple-choice',
            question: 'What does Jesus teach about loving enemies?',
            options: [
              'It is optional for spiritual giants',
              'It is impossible for regular people',
              'It is a core command for His followers',
              'It only applies to non-violent enemies'
            ],
            correctAnswer: 2,
            explanation: 'Jesus explicitly commands His followers to "love your enemies and pray for those who persecute you," showing radical, sacrificial love.',
            passageReference: 'Matthew 5:43-48'
          }
        ]
      }
    },
    {
      id: 'gospel-basics-week8',
      weekNumber: 8,
      title: 'Course Review & Application',
      objectives: [
        'Synthesize learning from all four Gospels',
        'Understand how the Gospels complement each other',
        'Apply Gospel principles to your personal faith',
        'Develop a personal relationship with Jesus'
      ],
      passages: ['John 3:16-18', 'Matthew 28:19-20', 'All four Gospel conclusions'],
      content: `Over the past seven weeks, we\'ve journeyed through the four Gospels, encountering Jesus from different angles. Matthew presented Jesus as the Messiah king; Mark showed Jesus as the powerful servant; Luke revealed Jesus as the compassionate friend; John unveiled Jesus as the divine Word. Rather than competing accounts, these complementary perspectives provide a fuller, richer picture of who Jesus is. The Gospels are not primarily theological treatises but narratives inviting us into relationship with Jesus. Each Gospel concludes not with abstract doctrine but with encounters: Matthew with the Great Commission, Mark with resurrection appearance, Luke with the Ascension, John with the beloved disciple and the risen Jesus. The culmination of Gospel study isn\'t intellectual knowledge but transformed living—becoming Jesus\' followers who embody His values, extend His compassion, and participate in His mission. John\'s Gospel summarizes the purpose of the Gospels: "Jesus performed many other signs in the presence of his disciples, which are not recorded in this book. But these are written that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name." Gospel study aims at faith—trusting Jesus with your life and being transformed by His grace. As you move forward in your faith journey, return to the Gospels regularly. Meditate on Jesus\' teachings. Notice how the Spirit applies His words to your unique circumstances. Allow Jesus to continually reshape your understanding of God, yourself, and your calling.`,
      keyTakeaways: [
        'The four Gospels provide complementary, not contradictory, portraits of Jesus',
        'Gospel study aims at relationship and faith, not just information',
        'Jesus invites His followers into His mission of love, justice, and redemption',
        'The Gospels are written so "you may believe that Jesus is the Messiah, the Son of God"'
      ],
      reflection: 'What is your response to Jesus based on what you\'ve learned in the Gospels?',
      resources: ['Reflect on your favorite Gospel passage', 'Plan regular Gospel reading going forward'],
      quiz: {
        id: 'gospel-basics-week8-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'q8-1',
            type: 'multiple-choice',
            question: 'How are the four Gospel accounts best understood?',
            options: [
              'They contradict each other and cannot both be true',
              'They are complementary perspectives on Jesus from different angles',
              'Only one is accurate; the others are legendary',
              'They are purely spiritual allegories with no historical basis'
            ],
            correctAnswer: 1,
            explanation: 'Rather than viewing the Gospels as contradictory, we should see them as complementary—each author presents Jesus in a way meaningful to their specific audience.',
            passageReference: 'Overview of all four Gospels'
          },
          {
            id: 'q8-2',
            type: 'true-false',
            question: 'The Gospels were written to provide comprehensive historical detail about Jesus\' life.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'While the Gospels contain historical information, they were written with a theological purpose: to invite faith in Jesus as the Messiah and Son of God.',
            passageReference: 'John 20:30-31'
          },
          {
            id: 'q8-3',
            type: 'multiple-choice',
            question: 'What is the ultimate purpose of Gospel study according to John 20:31?',
            options: [
              'To become a Biblical scholar',
              'To prove the historicity of first-century Palestine',
              'To believe that Jesus is the Messiah, the Son of God, and have life in His name',
              'To condemn those with different beliefs'
            ],
            correctAnswer: 2,
            explanation: 'John explicitly states his purpose: "These are written that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name."',
            passageReference: 'John 20:30-31'
          }
        ]
      }
    }
  ]
};

// Prayer 101 Course - 4 weeks, Beginner Level
const PRAYER_101: StudyGuide = {
  id: 'prayer-101',
  title: 'Prayer 101',
  description: 'Learn the foundations of Christian prayer. Understand what prayer is, how to pray, and how to deepen your prayer life through biblical models and practical guidance.',
  difficulty: 'beginner',
  weeks: 4,
  estimatedHours: 6,
  syllabus: 'This 4-week course teaches you the basics of Christian prayer. You\'ll learn from biblical examples, discover different prayer practices, and develop a personal prayer discipline.',
  tags: ['prayer', 'spiritual-disciplines', 'new-testament', 'fundamentals'],
  learningObjectives: [
    'Understand what prayer is and why it matters',
    'Learn biblical models of prayer including the Lord\'s Prayer',
    'Develop practical prayer disciplines and habits',
    'Understand different types of prayer and how to pray in various circumstances'
  ],
  lessons: [
    {
      id: 'prayer-101-week1',
      weekNumber: 1,
      title: 'What is Prayer?',
      objectives: [
        'Understand prayer as conversation with God',
        'Learn biblical foundations for prayer',
        'Understand why God listens to prayer',
        'Learn how prayer shapes our relationship with God'
      ],
      passages: ['1 Thessalonians 5:17', 'Matthew 6:5-15', 'Philippians 4:4-7'],
      content: `Prayer is simply talking with God. It\'s not complicated religious performance but honest, authentic conversation with your heavenly Father. In Christianity, prayer rests on the revolutionary belief that God cares about you personally, listens when you speak, and invites you into relationship through prayer. The Apostle Paul writes "pray without ceasing," suggesting prayer isn\'t limited to formal times but can permeate daily life. Jesus teaches His followers to pray, modeling prayer throughout His ministry. Prayer isn\'t about using perfect words or impressive language. Jesus warns against showy prayer that seeks human approval. Instead, authentic prayer is humble, honest, and sincere. Prayer can include praise for who God is, thanksgiving for His gifts, confession of sin, intercession for others, and petition for your own needs. God invites all these forms of prayer. Prayer changes us even more than it changes circumstances. Through prayer, we align our desires with God\'s, gain perspective on our problems, and experience God\'s presence and power. Prayer isn\'t about manipulating God to do what we want; it\'s about opening ourselves to what God wants to do in us and through us.`,
      keyTakeaways: [
        'Prayer is authentic conversation with God, not religious performance',
        'God listens and cares about your personal concerns',
        'Prayer includes praise, thanks, confession, intercession, and petition',
        'Prayer transforms us as much as it changes our circumstances'
      ],
      reflection: 'What has your experience with prayer been, and what would you like it to become?',
      resources: ['Bible reading: Matthew 6:5-15, Philippians 4:4-7', 'Reflection on different types of prayer'],
      quiz: {
        id: 'prayer-101-week1-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'p1-1',
            type: 'multiple-choice',
            question: 'According to Jesus, what is wrong with the prayers of the Pharisees?',
            options: [
              'They use improper grammar',
              'They are too long and complex',
              'They seek human approval rather than genuine connection with God',
              'They ask for too many things'
            ],
            correctAnswer: 2,
            explanation: 'Jesus criticizes the Pharisees for praying loudly on street corners seeking human praise, rather than praying sincerely in private to God.',
            passageReference: 'Matthew 6:5-6'
          },
          {
            id: 'p1-2',
            type: 'true-false',
            question: 'Paul teaches that prayer should only happen during dedicated prayer times.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Paul writes "pray without ceasing," suggesting prayer can be woven throughout daily life, not confined to specific times.',
            passageReference: '1 Thessalonians 5:17'
          },
          {
            id: 'p1-3',
            type: 'multiple-choice',
            question: 'What are the main components of the prayer Jesus teaches (the Lord\'s Prayer)?',
            options: [
              'Only asking God for things',
              'Praise, requests, and forgiveness',
              'Addressing God, honoring His name, seeking His kingdom, requesting provision and forgiveness, and asking for protection',
              'Memorized words repeated exactly'
            ],
            correctAnswer: 2,
            explanation: 'The Lord\'s Prayer includes multiple elements: addressing God as Father, honoring His name, seeking His kingdom, asking for daily provision, requesting forgiveness and the ability to forgive, and asking for protection.',
            passageReference: 'Matthew 6:9-13'
          }
        ]
      }
    },
    {
      id: 'prayer-101-week2',
      weekNumber: 2,
      title: 'The Lord\'s Prayer: Jesus\' Model',
      objectives: [
        'Understand each petition in the Lord\'s Prayer',
        'Learn how the Lord\'s Prayer reflects God\'s character',
        'Learn how to pray using Jesus\' model',
        'Understand the priorities Jesus teaches in prayer'
      ],
      passages: ['Matthew 6:9-13', 'Luke 11:2-4', 'Matthew 6:1-15'],
      content: `Jesus\' most famous prayer, often called the Lord\'s Prayer or Our Father, provides a model for all Christian prayer. Rather than a magical formula to recite, it\'s a template showing what to pray for and in what order. The prayer begins "Our Father in heaven, hallowed be your name." This opening establishes the posture of prayer: we come before God as children to a loving Father, acknowledging His holiness and transcendence. "Your kingdom come, your will be done on earth as it is in heaven" shows that Jesus\' primary concern isn\'t our comfort but God\'s purposes and reign. Only then do we ask for personal needs: "Give us today our daily bread." Notice the request is for daily provision, not excessive wealth—it reflects trust that God provides what we need. "Forgive us our debts as we forgive our debtors" connects our need for God\'s forgiveness with our obligation to forgive others. This is countercultural—Jesus suggests our forgiveness is contingent on our forgiving others. "Lead us not into temptation but deliver us from evil" acknowledges human weakness and asks for God\'s protection. The prayer concludes by returning to God\'s kingdom and power. The structure is instructive: God\'s glory and purposes come first; our needs come second; and forgiveness and protection complete the picture. Praying the Lord\'s Prayer regularly helps realign our priorities with Jesus\' vision.`,
      keyTakeaways: [
        'The Lord\'s Prayer is a model showing what to pray for and priorities',
        'It begins with praise and God\'s kingdom, not personal requests',
        'It teaches reliance on God for daily provision, not accumulation',
        'It connects forgiveness from God with our forgiveness of others'
      ],
      reflection: 'How does the Lord\'s Prayer reorder your prayer priorities?',
      resources: ['Memorize and pray the Lord\'s Prayer daily', 'Reflect on each petition and what it means'],
      quiz: {
        id: 'prayer-101-week2-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'p2-1',
            type: 'multiple-choice',
            question: 'What does "hallowed be your name" mean in the Lord\'s Prayer?',
            options: [
              'God\'s name is secret and hidden',
              'We acknowledge and honor God\'s holiness',
              'We want to memorize Bible verses',
              'We are asking for a blessing'
            ],
            correctAnswer: 1,
            explanation: 'To hallow God\'s name means to treat it as holy, to honor God\'s character and reputation in our lives and prayers.',
            passageReference: 'Matthew 6:9'
          },
          {
            id: 'p2-2',
            type: 'true-false',
            question: 'The Lord\'s Prayer teaches that we should ask God for unlimited wealth and possessions.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Jesus teaches us to ask for "daily bread"—provision for today—reflecting trust in God\'s care rather than anxiety about accumulation.',
            passageReference: 'Matthew 6:11'
          },
          {
            id: 'p2-3',
            type: 'multiple-choice',
            question: 'How does the Lord\'s Prayer connect God\'s forgiveness with human forgiveness?',
            options: [
              'They are unrelated',
              'We forgive others first, then ask God to forgive us',
              'Jesus suggests our forgiveness correlates with how we forgive others',
              'God\'s forgiveness makes forgiving others optional'
            ],
            correctAnswer: 2,
            explanation: '"Forgive us our debts as we forgive our debtors" directly connects the two, suggesting our willingness to forgive others reflects our request for forgiveness from God.',
            passageReference: 'Matthew 6:12'
          }
        ]
      }
    },
    {
      id: 'prayer-101-week3',
      weekNumber: 3,
      title: 'Prayer Practices: Developing Consistency',
      objectives: [
        'Establish a personal prayer discipline',
        'Learn different prayer practices and techniques',
        'Understand how to pray in various circumstances',
        'Develop accountability for a consistent prayer life'
      ],
      passages: ['Philippians 4:4-7', 'Colossians 4:2', 'Ephesians 6:18'],
      content: `Consistent prayer is like exercising a muscle: it strengthens through practice. Many new believers wonder how to establish a prayer habit. Start small and sustainable: five minutes daily is better than promising an hour you won\'t keep. Choose a consistent time and place—early morning, lunch break, before bed—and make it part of your routine. Different prayer practices serve different purposes. Intercessory prayer focuses on praying for others\' needs. Contemplative or meditative prayer involves listening to God through silence and reflection. Journaling prayer combines writing with prayer, helping process emotions and thoughts. Praying Scripture—reading a Bible passage and praying it back to God—deepens meditation on God\'s Word. Walking while praying, praying with others in community, and praying during daily activities all deepen prayer\'s role in your life. The Apostle Paul writes "pray without ceasing," which doesn\'t require constant formal prayer but suggests an attitude of conversation with God throughout your day. You can pray while commuting, working, or caring for others—turning life\'s moments into prayer opportunities. Accountability helps sustain prayer. Share your prayer commitment with a trusted friend or small group. Pray together sometimes. Report back on how your prayer life is developing. This community support sustains commitment when motivation wanes. As your prayer discipline grows, you\'ll notice God\'s transforming presence increasingly shaping your character, decisions, and relationships.`,
      keyTakeaways: [
        'Consistent, small prayer habits are better than ambitious, unsustained ones',
        'Different prayer practices (intercession, contemplation, journaling, Scripture-praying) serve different purposes',
        'Prayer can be woven throughout daily activities, not confined to formal times',
        'Community accountability helps sustain consistent prayer practice'
      ],
      reflection: 'What prayer practice will you commit to, and how will you build accountability?',
      resources: ['Choose and commit to a prayer practice', 'Find an accountability partner for your prayer life'],
      quiz: {
        id: 'prayer-101-week3-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'p3-1',
            type: 'multiple-choice',
            question: 'What is the best approach to establishing a prayer discipline?',
            options: [
              'Commit to hours of daily prayer to impress God',
              'Start small with sustainable habits like 5-15 minutes daily',
              'Only pray when you feel moved emotionally',
              'Prayer doesn\'t require consistency'
            ],
            correctAnswer: 1,
            explanation: 'Sustainable, small prayer habits build discipline better than ambitious commitments you can\'t maintain. Consistency matters more than duration.',
            passageReference: 'Philippians 4:6'
          },
          {
            id: 'p3-2',
            type: 'true-false',
            question: 'Prayer can only happen during formal, dedicated prayer times.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Prayer can be woven throughout daily activities. You can pray while working, commuting, exercising, or caring for others.',
            passageReference: '1 Thessalonians 5:17'
          },
          {
            id: 'p3-3',
            type: 'multiple-choice',
            question: 'Why is accountability helpful in developing a prayer life?',
            options: [
              'To shame people into prayer',
              'To support and encourage consistent practice when motivation wanes',
              'To judge others\' prayer lives',
              'Prayer doesn\'t benefit from accountability'
            ],
            correctAnswer: 1,
            explanation: 'Sharing commitment with others and reporting progress provides encouragement and support, helping sustain prayer practice over time.',
            passageReference: 'Hebrews 10:24-25'
          }
        ]
      }
    },
    {
      id: 'prayer-101-week4',
      weekNumber: 4,
      title: 'Deepening Your Prayer Life',
      objectives: [
        'Understand challenges and obstacles in prayer',
        'Learn how to pray in crisis and difficult times',
        'Develop a mature, evolving prayer life',
        'Understand God\'s perspective on answered and unanswered prayer'
      ],
      passages: ['Psalm 22:1-11', 'Romans 8:26-27', '1 Peter 3:7'],
      content: `As your prayer life develops, you\'ll encounter challenges: distractions, doubt about whether God listens, frustration when prayers seem unanswered, and times when prayer feels dry and meaningless. These are normal parts of faith development, not signs that prayer doesn\'t work. When distracted during prayer, gently refocus without harsh self-judgment. Use written prayers, Scripture, or physical movement if sitting silently doesn\'t help. When doubting God listens, return to Jesus\' teaching that God knows your needs before you ask and invites your requests. The Apostle Paul writes "the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us." Even when you don\'t have words, God understands. Unanswered prayer is particularly challenging. Jesus teaches "whatever you ask in prayer, believing, you will receive," yet experience shows God doesn\'t grant every request. God isn\'t a vending machine dispensing what we ask. Sometimes God says no because He sees a bigger picture than we do. Sometimes waiting becomes the answer—God\'s yes delayed for our growth. Sometimes the answer comes differently than expected. Even Jesus prayed "if it be possible, let this cup pass from me," yet accepted God\'s refusal. Praying through crisis—death, loss, illness, injustice—requires honesty. The Psalmist cries out "My God, my God, why have you forsaken me?" in the darkest prayer recorded in Scripture. Prayer isn\'t about maintaining positive feelings but about honest processing of real experiences before God. God welcomes lament, anger, doubt, and questions. A mature prayer life doesn\'t eliminate struggle but provides a context for processing it. As you grow in prayer, your requests may shift from self-focused desires to intercession for others and alignment with God\'s purposes. You\'ll experience seasons of vivid divine presence and dry seasons where prayer feels routine. All these are normal, spiritual growth. The invitation remains: come, speak with God, listen, be transformed.`,
      keyTakeaways: [
        'Prayer challenges like distraction and doubt are normal, not failures',
        'God doesn\'t answer every prayer with yes; sometimes no or wait are His answers',
        'Honest lament and doubt in prayer are biblical and valid',
        'A mature prayer life develops through various seasons and experiences'
      ],
      reflection: 'How do you respond when your prayers aren\'t answered as you hope, and what does that teach you about God?',
      resources: ['Pray through a difficult situation or unanswered prayer', 'Read the Psalms for examples of honest prayer'],
      quiz: {
        id: 'prayer-101-week4-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'p4-1',
            type: 'multiple-choice',
            question: 'What does Paul teach about prayer when we don\'t know what to pray?',
            options: [
              'We should just give up praying',
              'The Holy Spirit intercedes for us even without our words',
              'God only listens to perfectly formulated prayers',
              'We must always have the right words'
            ],
            correctAnswer: 1,
            explanation: 'Paul writes that even when we don\'t know what to pray, "the Spirit himself intercedes for us," so God understands our deepest needs beyond words.',
            passageReference: 'Romans 8:26-27'
          },
          {
            id: 'p4-2',
            type: 'true-false',
            question: 'Jesus taught that God will grant absolutely every prayer request made with enough faith.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'While Jesus teaches about the power of faith in prayer, experience and Scripture show God sometimes says no or wait, responding according to His greater wisdom.',
            passageReference: 'Matthew 26:39, 2 Corinthians 12:8-9'
          },
          {
            id: 'p4-3',
            type: 'multiple-choice',
            question: 'Is it appropriate to express anger or doubt in prayer?',
            options: [
              'No, prayer must always be positive',
              'Only in private, never publicly',
              'Yes, the Psalms and Jesus model honest emotional expression in prayer',
              'Only for advanced spiritual practitioners'
            ],
            correctAnswer: 2,
            explanation: 'The Psalms contain prayers of lament, anger, and doubt. Jesus even cried out "Why have you forsaken me?" Prayer is a place for honest emotional expression.',
            passageReference: 'Psalm 22, Matthew 27:46'
          }
        ]
      }
    }
  ]
};

// NT Essentials Course - 6 weeks, Intermediate Level
const NT_ESSENTIALS: StudyGuide = {
  id: 'nt-essentials',
  title: 'NT Essentials',
  description: 'Explore core New Testament theology including justification, grace, the Holy Spirit, and the church. Deepen your understanding of Christian doctrine.',
  difficulty: 'intermediate',
  weeks: 6,
  estimatedHours: 10,
  syllabus: 'This 6-week course examines essential New Testament themes including salvation, faith, grace, the Holy Spirit\'s role, church community, and Christian living.',
  tags: ['new-testament', 'theology', 'doctrine', 'intermediate'],
  learningObjectives: [
    'Understand justification by faith and the role of grace',
    'Learn how the Holy Spirit empowers Christian life',
    'Grasp the nature and purpose of the church',
    'Understand Christian ethics and holy living',
    'Develop a holistic view of New Testament theology'
  ],
  lessons: [
    {
      id: 'nt-essentials-week1',
      weekNumber: 1,
      title: 'Justification & Grace',
      objectives: [
        'Understand the doctrine of justification by faith',
        'Learn how grace differs from works',
        'Grasp the role of faith in salvation'
      ],
      passages: ['Romans 3:21-31', 'Ephesians 2:1-10', 'Galatians 2:15-21'],
      content: `The doctrine of justification by faith is central to New Testament theology and the Protestant Reformation. It answers a fundamental question: How does a sinful person become right with a holy God? Paul answers: through faith in Christ, not through earning salvation through works. Justification means God declares us "not guilty" and righteous in His sight—not because we've earned it, but because Christ's righteousness is credited to us. Grace is God's unmerited favor—we don't deserve it, can't earn it, and couldn't get it through our own effort. Paul contrasts this with a "works-based" approach: "If it were by grace, then it is no longer by works; if it were by works, then it is no longer by grace" (Romans 11:6). This revolutionary idea meant that salvation wasn't available only to those who kept Jewish laws perfectly, but to all who believed—Gentiles included. This doctrine continues to revolutionize individual faith: you're not saved by your perfect performance but by trusting Christ and His finished work.`,
      keyTakeaways: [
        'Justification means God declares us righteous through faith in Christ',
        'Grace is unmerited favor that can\'t be earned through works',
        'Salvation is received by faith, not achieved by performance',
        'This truth is liberating—we\'re accepted by God not by our goodness but by Christ\'s goodness'
      ],
      reflection: 'How does the truth of justification by grace through faith change your relationship with God?',
      resources: ['Romans 3-8 deep study', 'Reflection on grace vs. works in your life'],
      quiz: {
        id: 'nt-essentials-week1-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'nte1-1',
            type: 'multiple-choice',
            question: 'What does justification mean in Christian theology?',
            options: [
              'Being made morally perfect',
              'God declaring us righteous through faith in Christ',
              'Earning God\'s favor through good works',
              'Being forgiven but still guilty'
            ],
            correctAnswer: 1,
            explanation: 'Justification is God\'s declaration that we are righteous—not because we\'re perfect, but because Christ\'s righteousness is credited to us through faith.',
            passageReference: 'Romans 3:24-26'
          },
          {
            id: 'nte1-2',
            type: 'true-false',
            question: 'According to Paul, salvation is by grace through faith, not by works.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'This is a core teaching of Paul: salvation is by grace (God\'s unmerited favor) through faith (trust in Christ), not by our works or moral achievement.',
            passageReference: 'Ephesians 2:8-9'
          },
          {
            id: 'nte1-3',
            type: 'multiple-choice',
            question: 'How does Paul use the phrase "works of the law" in Romans 3?',
            options: [
              'As the primary path to salvation',
              'As insufficient for justification—faith in Christ is required',
              'As equally valid with faith',
              'As irrelevant to Christian life'
            ],
            correctAnswer: 1,
            explanation: 'Paul argues that works of the law cannot justify us; only faith in Christ brings justification. This was revolutionary because it opened salvation to both Jews and Gentiles.',
            passageReference: 'Romans 3:28'
          }
        ]
      }
    },
    {
      id: 'nt-essentials-week2',
      weekNumber: 2,
      title: 'The Holy Spirit\'s Role',
      objectives: [
        'Understand the Holy Spirit\'s empowerment of Christian life',
        'Learn the fruits and gifts of the Spirit',
        'Grasp how the Spirit enables holy living'
      ],
      passages: ['Romans 8:1-17', '1 Corinthians 12:1-14', 'Galatians 5:16-26'],
      content: `The Holy Spirit is not an impersonal force but the active presence of God in the believer's life. After Jesus ascended, He sent the Spirit to live in believers and empower them for the Christian life. The Spirit performs several crucial roles: He convicts the world of sin and draws people to faith, He indwells believers and transforms them, He gives spiritual gifts for ministry, and He produces fruit—character growth like love, joy, peace, patience, kindness. Paul teaches that living by the Spirit means being guided by Him, not enslaved to fleshly desires. The Spirit enables us to mortify (put to death) sinful impulses and grow in righteousness. Believers are "filled with the Spirit" (Ephesians 5:18), meaning they're controlled by and responsive to the Spirit's leading. The gifts of the Spirit—prophecy, teaching, encouragement, healing, tongues, interpretation—are given for building up the church, not for individual pride. The Spirit also produces fruit, internal character transformation that demonstrates Christ's life in us. Living in the Spirit means yielding to His control, listening for His guidance, and cooperating with His transformative work.`,
      keyTakeaways: [
        'The Holy Spirit is God\'s empowering presence in believers\' lives',
        'The Spirit transforms us, producing fruit like love, joy, and peace',
        'The Spirit gives gifts for ministry and building up the church',
        'Christian living is learning to walk by the Spirit, not by fleshly impulses'
      ],
      reflection: 'In what areas of your life do you most need the Holy Spirit\'s empowerment and transformation?',
      resources: ['Romans 8, 1 Corinthians 12, Galatians 5 study', 'Reflection on spiritual gifts and fruit'],
      quiz: {
        id: 'nt-essentials-week2-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'nte2-1',
            type: 'multiple-choice',
            question: 'What is the primary role of the Holy Spirit in a believer\'s life?',
            options: [
              'To judge sin and condemn believers',
              'To live in and transform believers, empowering holy living',
              'To make believers perfect immediately',
              'To reveal future prophecies'
            ],
            correctAnswer: 1,
            explanation: 'The Holy Spirit indwells believers, guides them, empowers them, and transforms them gradually into the likeness of Christ.',
            passageReference: 'Romans 8:9-11'
          },
          {
            id: 'nte2-2',
            type: 'true-false',
            question: 'The fruit of the Spirit includes external actions like speaking in tongues.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'The fruit of the Spirit refers to internal character qualities: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Gifts (like tongues) are different from fruit.',
            passageReference: 'Galatians 5:22-23'
          },
          {
            id: 'nte2-3',
            type: 'multiple-choice',
            question: 'According to Paul, why are spiritual gifts given?',
            options: [
              'To demonstrate individual superiority',
              'To build up the church and serve others',
              'To prove one\'s faith is genuine',
              'Only to leaders and clergy'
            ],
            correctAnswer: 1,
            explanation: 'Paul teaches that spiritual gifts are given "for the common good" to build up the body of Christ, not for individual glory.',
            passageReference: '1 Corinthians 12:7'
          }
        ]
      }
    },
    {
      id: 'nt-essentials-week3',
      weekNumber: 3,
      title: 'The Church & Community',
      objectives: [
        'Understand the church as the body of Christ',
        'Learn about church unity and diversity',
        'Grasp the importance of community in Christian life'
      ],
      passages: ['1 Corinthians 12:12-27', 'Ephesians 4:1-16', 'Hebrews 10:24-25'],
      content: `The church is not a building but the people of God—the body of Christ. Paul uses the metaphor of a body to explain church unity: Christ is the head, believers are various parts (eyes, ears, hands, feet), and each part has a function. Just as a physical body needs all its parts working together, the church needs all believers contributing their gifts. This metaphor teaches several truths: First, there's unity—one body, one Spirit, one Lord, one faith, one baptism. Second, there's diversity—different gifts, roles, and functions are necessary and valuable. A foot shouldn't say "I'm not part of the body because I'm not a hand"; each part is vital. Third, there's interdependence—parts care for each other, stronger parts support weaker ones, and when one part suffers, all suffer. The church is not individualistic but communal. Christians aren't meant to be isolated believers but members of a body caring for each other, holding each other accountable, building each other up, and sharing life together. This requires humility (valuing others), service (using gifts for others' benefit), and commitment (showing up, being present, contributing). The author of Hebrews encourages believers not to neglect gathering together but to spur one another on to love and good deeds.`,
      keyTakeaways: [
        'The church is the body of Christ—believers unified with Christ as head',
        'The church needs diversity—different gifts and roles all contribute',
        'Believers are interdependent—we need each other and care for each other',
        'Church life is communal, not individual—we\'re meant to live in community'
      ],
      reflection: 'How are you contributing your gifts to your church community, and how do you need the body to support you?',
      resources: ['1 Corinthians 12, Ephesians 4 study', 'Reflection on your role in your church body'],
      quiz: {
        id: 'nt-essentials-week3-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'nte3-1',
            type: 'multiple-choice',
            question: 'What does Paul mean by calling the church "the body of Christ"?',
            options: [
              'The church building is made of stone',
              'Believers are unified parts of one body with Christ as head',
              'The church is a metaphorical concept with no real function',
              'Only leaders represent the body of Christ'
            ],
            correctAnswer: 1,
            explanation: 'The body metaphor teaches that the church is unified under Christ\'s headship, with diverse members each contributing to the whole.',
            passageReference: '1 Corinthians 12:12-27'
          },
          {
            id: 'nte3-2',
            type: 'true-false',
            question: 'According to Paul, diversity of gifts in the church is a problem that needs to be fixed.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Paul celebrates diversity of gifts as essential—different gifts are needed for the body to function properly and healthily.',
            passageReference: '1 Corinthians 12:14-20'
          },
          {
            id: 'nte3-3',
            type: 'multiple-choice',
            question: 'What is the significance of believers gathering together according to Hebrews 10:24-25?',
            options: [
              'It\'s optional; faith can be private',
              'It\'s important for encouraging each other, holding accountable, and spurring on to good works',
              'It\'s only for formal worship, not daily life',
              'It\'s a burden to be endured'
            ],
            correctAnswer: 1,
            explanation: 'Hebrews emphasizes that gathering together as believers is important—we encourage each other, spur each other to love and good deeds, and strengthen faith together.',
            passageReference: 'Hebrews 10:24-25'
          }
        ]
      }
    },
    {
      id: 'nt-essentials-week4',
      weekNumber: 4,
      title: 'Christian Living & Ethics',
      objectives: [
        'Understand New Testament ethical teachings',
        'Learn how faith works itself out in daily life',
        'Grasp the balance between grace and obedience'
      ],
      passages: ['Romans 12:1-21', 'Colossians 3:1-17', '1 John 2:1-11'],
      content: `New Testament ethics flows from grace and gratitude, not fear or obligation. Paul begins Romans 12 with "offer your bodies as a living sacrifice"—after explaining salvation by grace, he appeals to believers to live in light of God's mercy. This is not legalism but a grateful response to grace. New Testament ethics covers relationships (honor, love, patience with others), work (diligence, honesty, serving the Lord), finances (generosity, contentment, not coveting), sexuality (purity, faithfulness, respect), and more. Paul teaches that believers should be "transformed by the renewing of your mind"—not conformed to worldly values but shaped by gospel truth. This transformation produces practical fruit: living peaceably with others, overcoming evil with good, paying taxes, honoring authorities (unless they command sin), loving neighbors as oneself. Colossians teaches that Christian living flows from union with Christ: if you died with Christ, live as if dead to sin; if raised with Christ, seek things above. James emphasizes that genuine faith produces works: faith without works is dead. This doesn't contradict justification by faith; rather, faith that saves necessarily produces obedience and good works. Christian ethics isn't burdensome legalism but the glad overflow of a heart transformed by grace.`,
      keyTakeaways: [
        'New Testament ethics flow from grace and gratitude, not fear',
        'Believers are transformed by renewed minds, living differently from worldly values',
        'Christian living produces practical fruit: peace, love, honesty, generosity',
        'Faith necessarily produces works—authentic faith works itself out in daily obedience'
      ],
      reflection: 'How should the grace you\'ve received shape your ethics and daily decisions?',
      resources: ['Romans 12, Colossians 3 study', 'Reflection on how grace motivates obedience'],
      quiz: {
        id: 'nt-essentials-week4-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'nte4-1',
            type: 'multiple-choice',
            question: 'What is the primary motivation for Christian ethics in the New Testament?',
            options: [
              'Fear of punishment',
              'Desire to earn salvation',
              'Gratitude for grace received and mercy experienced',
              'Social pressure and conformity'
            ],
            correctAnswer: 2,
            explanation: 'Paul grounds ethics in grace: because of God\'s mercy, believers respond by offering themselves in grateful service, not from fear or obligation.',
            passageReference: 'Romans 12:1-2'
          },
          {
            id: 'nte4-2',
            type: 'true-false',
            question: 'James teaches that faith without works is dead, contradicting Paul\'s view of justification by faith.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Both Paul and James affirm that genuine faith produces works. They\'re not contradictory—saving faith necessarily produces obedience and good works.',
            passageReference: 'James 2:26, Romans 3:28'
          },
          {
            id: 'nte4-3',
            type: 'multiple-choice',
            question: 'What does Paul mean by "transformed by the renewing of your mind"?',
            options: [
              'Believers naturally change without effort',
              'Believers\' thinking and values are renewed by Scripture, producing changed behavior',
              'Only clergy need to be transformed',
              'The world\'s values should reshape Christian thinking'
            ],
            correctAnswer: 1,
            explanation: 'Paul teaches that transformation happens as believers allow Scripture and the Spirit to renew their thinking, producing a different way of living.',
            passageReference: 'Romans 12:2'
          }
        ]
      }
    },
    {
      id: 'nt-essentials-week5',
      weekNumber: 5,
      title: 'The Good News of Salvation',
      objectives: [
        'Understand the good news (Gospel) clearly',
        'Learn how salvation comes to believers',
        'Grasp the universal scope of redemption'
      ],
      passages: ['Romans 10:1-21', '1 Corinthians 15:1-11', '1 John 3:1-10'],
      content: `The Gospel is the good news that God offers salvation to all people through Christ. Paul defines the Gospel as: "Christ died for our sins according to the Scriptures, he was buried, he was raised on the third day according to the Scriptures" (1 Corinthians 15:3-4). This is the heart of the message. Salvation comes through belief in this Gospel—not mere intellectual agreement but trust and commitment. Paul quotes Joel: "Everyone who calls on the name of the Lord will be saved" (Romans 10:13). But how can they call on Him unless they believe? And how can they believe without hearing? And how can they hear without a preacher? This emphasizes the importance of witnessing and sharing the Gospel. John emphasizes God's love as the foundation: "This is how God showed his love among us: He sent his one and only Son into the world that we might live through him" (1 John 4:9). Salvation is not earned but received. It's described in multiple ways: justification (declared righteous), redemption (purchased and freed), reconciliation (restored relationship), adoption (made into God's family), regeneration (born again). All point to the same reality: through Christ's death and resurrection, sinners are forgiven, transformed, and restored to relationship with God.`,
      keyTakeaways: [
        'The Gospel is the good news: Christ died, was buried, and rose for our salvation',
        'Salvation comes through faith—trusting and committing to Christ',
        'God\'s salvation is offered to all people, not limited to any group',
        'Salvation transforms us—we\'re justified, redeemed, adopted, and made new'
      ],
      reflection: 'How does understanding salvation as God\'s gift rather than something earned change your perspective?',
      resources: ['1 Corinthians 15 study', 'Reflection on the Gospel and personal salvation story'],
      quiz: {
        id: 'nt-essentials-week5-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'nte5-1',
            type: 'multiple-choice',
            question: 'What is the Gospel according to Paul in 1 Corinthians 15?',
            options: [
              'A moral teaching about how to live',
              'Christ died for our sins, was buried, and was raised—the core of salvation',
              'A political movement against Rome',
              'An ancient myth without historical basis'
            ],
            correctAnswer: 1,
            explanation: 'Paul defines the Gospel as the saving historical events: Christ\'s death for sin, burial, and resurrection on the third day.',
            passageReference: '1 Corinthians 15:3-4'
          },
          {
            id: 'nte5-2',
            type: 'true-false',
            question: 'According to Romans 10:13, salvation is available only to those who have heard the Gospel from birth.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Paul teaches that "everyone who calls on the name of the Lord will be saved"—salvation is available to all who believe, emphasizing the need to share the Gospel with those who haven\'t heard.',
            passageReference: 'Romans 10:13'
          },
          {
            id: 'nte5-3',
            type: 'multiple-choice',
            question: 'What is the foundation of God\'s offer of salvation according to 1 John?',
            options: [
              'God\'s judgment of human sin',
              'God\'s love demonstrated in sending His Son',
              'Human merit and moral achievement',
              'Political power and influence'
            ],
            correctAnswer: 1,
            explanation: 'John emphasizes that salvation flows from God\'s love—He sent His Son into the world so we might live through Him.',
            passageReference: '1 John 4:9'
          }
        ]
      }
    },
    {
      id: 'nt-essentials-week6',
      weekNumber: 6,
      title: 'Course Review & Integration',
      objectives: [
        'Synthesize NT essential doctrines',
        'Understand how these themes connect',
        'Apply NT teaching to your faith journey'
      ],
      passages: ['Titus 2:11-14', 'Hebrews 12:1-3', '2 Peter 3:17-18'],
      content: `Over the past six weeks, we've explored essential New Testament themes: justification by grace through faith, the empowering work of the Holy Spirit, the church as the body of Christ, Christian living flowing from grace, and salvation through Christ. These themes are not isolated doctrines but interconnected truths that shape Christian faith and life. Justification establishes our standing with God. The Holy Spirit empowers our transformation. The church provides community and accountability. Ethics flows from grace. Salvation is Christ's gift to us. Together, these create a coherent understanding of what it means to follow Christ. Paul writes: "The grace of God has appeared that offers salvation to all people. It teaches us to say 'No' to ungodliness and worldly passions, and to live self-controlled, upright and godly lives in this present age" (Titus 2:11-12). Grace is both God's initial gift of salvation and His ongoing empowerment for holy living. The author of Hebrews encourages: "Let us run with perseverance the race marked out for us, fixing our eyes on Jesus" (Hebrews 12:1-2). Christian life is not a sprint but a marathon, and Jesus is our model and motivation. Peter concludes: "Grow in the grace and knowledge of our Lord and Savior Jesus Christ" (2 Peter 3:18). Growth in grace—deeper understanding of God's kindness and deeper experience of His transforming power—is the Christian life's trajectory. These NT essentials invite you into deeper faith, richer community, and more authentic living.`,
      keyTakeaways: [
        'NT doctrines are interconnected—justification, sanctification, church, and ethics flow together',
        'Grace is both salvation\'s foundation and the power for ongoing transformation',
        'Christian life is a race marked by persistence, with Jesus as our model',
        'Growth in grace—deeper understanding of and experience of God\'s kindness—is the goal'
      ],
      reflection: 'How do these NT essentials deepen and reshape your faith?',
      resources: ['Reflection on how these six weeks have changed your understanding', 'Prayer for ongoing growth in grace'],
      quiz: {
        id: 'nt-essentials-week6-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'nte6-1',
            type: 'multiple-choice',
            question: 'How are justification and sanctification related in New Testament teaching?',
            options: [
              'Justification is instant; sanctification is the ongoing process of being shaped into Christ\'s likeness',
              'They are unrelated doctrines',
              'Sanctification is completed immediately like justification',
              'Neither is important for Christian life'
            ],
            correctAnswer: 0,
            explanation: 'Justification is God\'s declaration that we\'re righteous (past tense). Sanctification is the ongoing process of transformation by the Spirit (ongoing). Both are God\'s work.',
            passageReference: 'Romans 6:1-14'
          },
          {
            id: 'nte6-2',
            type: 'true-false',
            question: 'According to Titus, grace teaches believers to live godly lives in this present age.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'Paul teaches that grace not only saves us but also trains us—it teaches us to say no to ungodliness and yes to godly living.',
            passageReference: 'Titus 2:11-12'
          },
          {
            id: 'nte6-3',
            type: 'multiple-choice',
            question: 'What is the goal of the Christian life according to Peter?',
            options: [
              'Achieving moral perfection in this life',
              'Accumulating wealth and comfort',
              'Growing in the grace and knowledge of Jesus',
              'Escaping the world'
            ],
            correctAnswer: 2,
            explanation: 'Peter concludes his letter with "grow in the grace and knowledge of our Lord and Savior Jesus Christ"—deepening grace and knowledge of Christ is the life goal.',
            passageReference: '2 Peter 3:18'
          }
        ]
      }
    }
  ]
};

// OT Stories Course - 8 weeks, Intermediate Level
const OT_STORIES: StudyGuide = {
  id: 'ot-stories',
  title: 'OT Stories',
  description: 'Journey through the Old Testament\'s greatest narratives. Discover how God\'s faithfulness unfolds through Israel\'s history from creation through restoration.',
  difficulty: 'intermediate',
  weeks: 8,
  estimatedHours: 14,
  syllabus: 'This 8-week course surveys major Old Testament narratives: Creation, Fall, Covenant, Exodus, Wilderness, Kingdom, Exile, and Restoration. Each week explores key stories and their theological significance.',
  tags: ['old-testament', 'narrative', 'history', 'intermediate'],
  learningObjectives: [
    'Understand the sweep of Old Testament history',
    'Learn key narratives and their theological meaning',
    'See God\'s faithfulness and covenant throughout OT history',
    'Connect OT stories to New Testament fulfillment',
    'Apply OT wisdom to contemporary faith challenges'
  ],
  lessons: [
    {
      id: 'ot-stories-week1',
      weekNumber: 1,
      title: 'Creation & Fall',
      objectives: [
        'Understand the creation story and God\'s purposes',
        'Learn about human sinfulness and its consequences',
        'Grasp God\'s grace in response to sin'
      ],
      passages: ['Genesis 1:1-3:24', 'Genesis 4:1-15', 'Romans 5:12-19'],
      content: `The Old Testament opens with creation—God speaks reality into existence and declares it good. Humanity is created in God's image, given dominion over creation, and commissioned to work and steward the garden. But this initial perfection is disrupted by humanity's rebellion. The serpent (Satan) tempts Eve and Adam to "be like God," to question God's word and grab for power. They eat the forbidden fruit, violating God's command. Sin enters the world, and its consequences cascade: shame, hiding from God, broken relationships, expulsion from the garden, pain in childbirth, and death entering human experience. Yet even in judgment, God shows grace. He provides coverings for their shame (Genesis 3:21—the first sacrifice), indicates that a redeemer will come through a descendant of Eve ("he will crush your head," Genesis 3:15), and allows humanity to live on. The Fall reveals two truths: first, humanity is responsible and accountable before God; second, God's grace precedes judgment. Later, Paul will teach that sin entered the world through Adam and spread to all people, but grace abounds through Christ, the "last Adam" who reverses Adam's disobedience through His obedience unto death.`,
      keyTakeaways: [
        'Creation shows God\'s power and goodness—all things made by and for God',
        'Humanity is created in God\'s image with responsibility and freedom',
        'The Fall reveals human sinfulness and rebellion against God',
        'God\'s grace appears even in judgment—promise of redemption emerges'
      ],
      reflection: 'How does understanding the Fall help you recognize sin in your own life and need for God\'s grace?',
      resources: ['Genesis 1-3 detailed study', 'Reflection on creation, freedom, and responsibility'],
      quiz: {
        id: 'ot-stories-week1-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots1-1',
            type: 'multiple-choice',
            question: 'What does it mean that humans are created in God\'s image?',
            options: [
              'Humans look exactly like God physically',
              'Humans reflect God\'s character, rationality, morality, and creative capacity',
              'Humans are divine and don\'t need God',
              'Only certain people bear God\'s image'
            ],
            correctAnswer: 1,
            explanation: 'Being made in God\'s image means humans reflect God\'s attributes—we have reason, moral awareness, creativity, and the ability to relate to God.',
            passageReference: 'Genesis 1:26-27'
          },
          {
            id: 'ots1-2',
            type: 'true-false',
            question: 'The Fall was a surprise to God and He had no plan to address sin.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'While sin disrupted God\'s creation, God\'s grace appeared immediately (Genesis 3:15), indicating He had a plan for redemption.',
            passageReference: 'Genesis 3:15, Revelation 13:8'
          },
          {
            id: 'ots1-3',
            type: 'multiple-choice',
            question: 'What is the primary consequence of sin in the Fall?',
            options: [
              'Only physical suffering',
              'Only spiritual death',
              'Broken relationship with God, shame, death, and alienation',
              'Momentary punishment then forgiveness'
            ],
            correctAnswer: 2,
            explanation: 'Sin breaks relationship with God, brings shame, introduces death, and alienates humans from God and each other.',
            passageReference: 'Genesis 3:8-19, Romans 5:12'
          }
        ]
      }
    },
    {
      id: 'ot-stories-week2',
      weekNumber: 2,
      title: 'Abraham & Covenant',
      objectives: [
        'Understand the Abrahamic covenant and its significance',
        'Learn about faith exemplified through Abraham',
        'Grasp how God initiates and keeps covenants'
      ],
      passages: ['Genesis 12:1-7', 'Genesis 15:1-21', 'Genesis 22:1-19'],
      content: `After the flood, God calls Abram (later Abraham) with a covenant promise: "Go from your country... to the land I will show you. I will make you into a great nation" (Genesis 12:1-2). This call requires faith—Abraham doesn't know the destination, only that God calls. He obeys, and God appears to him multiple times, reiterating the promise: descendants "as numerous as the stars," a land of their own, and blessing to all nations through him. This covenant is foundational to the Old Testament story. Abraham is seventy-five when God calls him; Sarah is barren. Humanly, the promise is impossible. Yet Abraham "believed the Lord, and he credited it to him as righteousness" (Genesis 15:6). This faith—trusting God despite impossible circumstances—becomes his defining characteristic and is cited throughout Scripture as the model of faith. The covenant is tested when God asks Abraham to sacrifice Isaac, the son of promise. Abraham obeys, willing to surrender what he loves most. God stops him at the last moment, providing a ram as substitute, and reiterates the covenant with an oath. Abraham's faith through testing becomes the paradigm: faith is not mere belief but trust evidenced by obedience, even in difficulty.`,
      keyTakeaways: [
        'God initiates covenant with Abraham based on grace, not Abraham\'s merit',
        'Abraham\'s faith in God\'s promise despite impossibility becomes the model for faith',
        'God tests faith and rewards it—Abraham\'s obedience is tested and honored',
        'The Abrahamic covenant establishes blessing for all nations through Abraham\'s descendants'
      ],
      reflection: 'What impossible circumstances in your life require faith like Abraham\'s?',
      resources: ['Genesis 12-22 study', 'Hebrews 11:8-19 reflection on Abraham\'s faith'],
      quiz: {
        id: 'ot-stories-week2-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots2-1',
            type: 'multiple-choice',
            question: 'What was the primary test of Abraham\'s faith?',
            options: [
              'Financial hardship',
              'Trusting God\'s promise despite Sarah\'s barrenness and advanced age',
              'Political persecution',
              'Military defeat'
            ],
            correctAnswer: 1,
            explanation: 'Abraham\'s faith was tested by God\'s promise of descendants through Sarah when both were too old for natural conception—he trusted God against all natural expectation.',
            passageReference: 'Genesis 15:1-6, Romans 4:18-22'
          },
          {
            id: 'ots2-2',
            type: 'true-false',
            question: 'Abraham\'s willingness to sacrifice Isaac demonstrated that his faith was conditional on receiving blessings.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Abraham\'s willingness to sacrifice Isaac—the son of promise—showed his faith was in God Himself, not in what God would give him.',
            passageReference: 'Genesis 22:1-14'
          },
          {
            id: 'ots2-3',
            type: 'multiple-choice',
            question: 'How did God account Abraham\'s faith according to Genesis 15:6?',
            options: [
              'As partial righteousness',
              'As credited to him as righteousness',
              'As insufficient without works',
              'As irrelevant to his standing with God'
            ],
            correctAnswer: 1,
            explanation: 'Abraham\'s faith was "credited to him as righteousness"—his trust in God was counted as right standing before God, a principle Paul later develops in Romans.',
            passageReference: 'Genesis 15:6, Romans 4:3'
          }
        ]
      }
    },
    {
      id: 'ot-stories-week3',
      weekNumber: 3,
      title: 'Exodus & Liberation',
      objectives: [
        'Understand the Exodus as Israel\'s foundational story',
        'Learn about God\'s deliverance and covenant renewal',
        'Grasp the significance of law and covenant'
      ],
      passages: ['Exodus 1:1-14:31', 'Exodus 19:1-20:21', 'Exodus 24:1-18'],
      content: `Generations after Abraham, Abraham's descendants are enslaved in Egypt. God raises up Moses to deliver them. After ten plagues demonstrate God's power over Egypt's gods, Pharaoh releases Israel. God parts the Red Sea, and Israel walks through on dry ground while Egyptian armies drown. This liberation—the Exodus—becomes Israel's defining narrative, celebrated annually in Passover. At Mount Sinai, God renews covenant with Israel and gives the Law—the Ten Commandments and related statutes. The covenant is conditional: "If you obey my voice and keep my covenant, you shall be my treasured possession among all peoples" (Exodus 19:5). The Law is not a burden imposed on reluctant slaves but a gift expressing God's character and calling Israel to holiness. The Law addresses moral behavior (no murder, theft, false witness), social justice (Sabbath, jubilee, treatment of strangers), and worship (sacrifice, festivals). Christians often misunderstand the Law, viewing it as legalism. But Paul teaches that the Law was "our guardian until Christ came" (Galatians 3:24)—it revealed sin, showed need for grace, and pointed toward redemption. The Exodus story witnesses to God's power, faithfulness, and liberating purpose. God doesn't remain distant but acts in history to free enslaved people. This story echoes through Scripture and becomes the template for understanding redemption.`,
      keyTakeaways: [
        'The Exodus demonstrates God\'s power to liberate and His covenant faithfulness',
        'The Law at Sinai reveals God\'s character and calls Israel to holy living',
        'God\'s covenant with Israel is conditional—obedience brings blessing, disobedience brings judgment',
        'The Exodus becomes the paradigm for understanding God\'s redemptive action'
      ],
      reflection: 'How does the Exodus story inform your understanding of God\'s liberating power in your own life?',
      resources: ['Exodus 1-24 study', 'Reflection on freedom, slavery, and obedience to God\'s ways'],
      quiz: {
        id: 'ot-stories-week3-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots3-1',
            type: 'multiple-choice',
            question: 'What is the primary significance of the Exodus for Israel?',
            options: [
              'A political victory over Egypt',
              'God\'s demonstration of power and faithfulness in liberating enslaved people',
              'An escape with no lasting significance',
              'A temporary relief until recapture'
            ],
            correctAnswer: 1,
            explanation: 'The Exodus demonstrated God\'s power over the Egyptian gods and God\'s covenant faithfulness in delivering Israel—it became Israel\'s defining narrative.',
            passageReference: 'Exodus 12:37-42, Deuteronomy 16:1-8'
          },
          {
            id: 'ots3-2',
            type: 'true-false',
            question: 'The Ten Commandments and Law given at Sinai were punitive restrictions God imposed on Israel.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'The Law revealed God\'s character and called Israel to holy living; it was a covenant gift, not oppressive restriction. Paul later clarifies that the Law showed sin and pointed to grace.',
            passageReference: 'Exodus 19:5-6, Galatians 3:19-24'
          },
          {
            id: 'ots3-3',
            type: 'multiple-choice',
            question: 'According to the Sinai covenant, what conditions determine Israel\'s blessing?',
            options: [
              'Nothing—blessing is unconditional',
              'Perfect moral achievement',
              'Obedience to God\'s voice and keeping covenant; disobedience brings judgment',
              'Military strength and political power'
            ],
            correctAnswer: 2,
            explanation: 'God\'s covenant with Israel was conditional: "If you obey my voice and keep my covenant, you shall be my treasured possession." Obedience brings blessing; disobedience brings judgment.',
            passageReference: 'Exodus 19:5-6, Leviticus 26:3-39'
          }
        ]
      }
    },
    {
      id: 'ot-stories-week4',
      weekNumber: 4,
      title: 'Kingdom & Failure',
      objectives: [
        'Understand Israel\'s establishment of monarchy',
        'Learn about David and his significance',
        'Grasp how kings failed covenant and God remained faithful'
      ],
      passages: ['1 Samuel 15-16', '2 Samuel 7:1-17', '1 Kings 11:1-13'],
      content: `After the Exodus and Sinai covenant, Israel wandered forty years in the wilderness, then conquered Canaan under Joshua. The period of judges (1200-1050 BCE) saw Israel struggling, often turning from God and experiencing judges like Deborah, Gideon, and Samson. Finally, Israel demanded a king "like other nations" (1 Samuel 8:5). God grants their request through Samuel, anointing Saul, then David. David becomes Israel's greatest king—poet, warrior, shepherd, and man of faith. After defeating Goliath and uniting Israel, David captures Jerusalem and plans to build God's temple. But God stops him, revealing a remarkable covenant: David's line will endure forever, and one of his descendants will build a lasting kingdom (2 Samuel 7:12-13). This Davidic covenant becomes foundational to messianic expectation—the promised Messiah will be "a son of David." Yet David also failed. He committed adultery with Bathsheba, murdered her husband, and faced judgment. His later successors increasingly turned from God. Solomon, David's son, began well but ultimately turned to idolatry, marrying foreign wives who led him astray. The kingdom divided: ten northern tribes (Israel) and two southern tribes (Judah). This section of Israel's story reveals both human failure and God's grace: despite royal disobedience, God preserved a remnant and fulfilled His covenant promises through David's line.`,
      keyTakeaways: [
        'David\'s reign established Israel\'s greatest period and received God\'s covenant promise',
        'The Davidic covenant promised an eternal kingdom and descendant ruling forever',
        'Even great leaders like David and Solomon failed morally, yet God\'s covenant endured',
        'God\'s faithfulness to covenant is not contingent on human perfection'
      ],
      reflection: 'How does seeing even great leaders fail encourage you regarding God\'s grace in your own struggles?',
      resources: ['1 Samuel 15-16, 2 Samuel 7, 1 Kings 11 study', 'Reflection on leadership, failure, and grace'],
      quiz: {
        id: 'ot-stories-week4-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots4-1',
            type: 'multiple-choice',
            question: 'What is the significance of the Davidic covenant in 2 Samuel 7?',
            options: [
              'God promised David unlimited military power',
              'God promised David\'s line would endure forever and a descendant would build God\'s house',
              'God rejected David for wanting to build a temple',
              'God\'s covenant was limited to David\'s lifetime'
            ],
            correctAnswer: 1,
            explanation: 'God\'s covenant with David promised an everlasting kingdom through David\'s line and that one of his descendants would build God\'s house—foundational to messianic hope.',
            passageReference: '2 Samuel 7:12-16'
          },
          {
            id: 'ots4-2',
            type: 'true-false',
            question: 'David\'s sin with Bathsheba nullified God\'s covenant promises to him.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Though David was judged for his sin, God\'s covenant with David endured. This demonstrates that God\'s covenant is based on His faithfulness, not human perfection.',
            passageReference: '2 Samuel 12:13-25'
          },
          {
            id: 'ots4-3',
            type: 'multiple-choice',
            question: 'How did Solomon\'s reign end compared to David\'s legacy?',
            options: [
              'Solomon surpassed David in faithfulness and power',
              'Solomon initially ruled wisely but ultimately turned to idolatry, leading the kingdom toward division',
              'Solomon remained faithful to God throughout his reign',
              'Solomon\'s reign was entirely unsuccessful'
            ],
            correctAnswer: 1,
            explanation: 'Solomon began with wisdom and wealth but ultimately pursued idolatry through foreign wives, turning the kingdom from God and contributing to its eventual division.',
            passageReference: '1 Kings 11:1-13'
          }
        ]
      }
    },
    {
      id: 'ot-stories-week5',
      weekNumber: 5,
      title: 'Exile & Judgment',
      objectives: [
        'Understand Israel\'s exile as covenant judgment',
        'Learn how prophets warned of judgment',
        'Grasp God\'s continued care even in exile'
      ],
      passages: ['2 Kings 17:1-23', 'Jeremiah 25:1-14', 'Lamentations 1:1-22'],
      content: `After the kingdom divided, both Israel and Judah gradually turned from God's covenant. Prophets like Isaiah, Jeremiah, Hosea, and Amos warned repeatedly: "Turn from idolatry and injustice, or face exile." But the kingdoms didn't repent. In 722 BCE, Assyria conquered Israel, deporting the ten northern tribes (mostly lost to history). In 586 BCE, Babylon conquered Judah, destroying Jerusalem's temple and deporting the people. Exile was devastating—displacement from the promised land, loss of temple and priesthood, sense of covenant abandonment. The book of Lamentations expresses this devastation: "How deserted lies the city, once so full of people!" (Lamentations 1:1). Yet even in exile, God's grace appeared. The prophets promised restoration: "Although I send them into exile among the nations, I will not completely destroy them" (Jeremiah 46:28). Daniel and others remained faithful in exile. God preserved a remnant and promised renewal. The exile clarified that God's covenant, while sure, involved consequences for disobedience. It also prepared God's people for deeper understanding of sin and grace, humbling them and preparing them for restoration. The exile is the Old Testament's darkest period, yet even darkness reveals God's faithfulness—judgment came as promised, but so did mercy.`,
      keyTakeaways: [
        'Exile was covenant judgment for persistent disobedience and idolatry',
        'Prophets warned repeatedly before judgment came; the people had opportunity to repent',
        'Even in exile, God preserved a remnant and promised restoration',
        'Exile taught God\'s people about sin\'s consequences and God\'s grace in judgment'
      ],
      reflection: 'What consequences in your life might be calling you to repentance and deeper faith in God\'s restoration?',
      resources: ['2 Kings 17, Jeremiah 25, Lamentations 1 study', 'Reflection on judgment, repentance, and hope'],
      quiz: {
        id: 'ot-stories-week5-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots5-1',
            type: 'multiple-choice',
            question: 'What was the primary cause of Israel and Judah\'s exile?',
            options: [
              'Military defeat by stronger enemies',
              'Covenant judgment for persistent idolatry and injustice despite prophetic warnings',
              'God\'s abandonment of Israel',
              'Economic collapse and poverty'
            ],
            correctAnswer: 1,
            explanation: 'The prophets clearly warned that exile would come as judgment for breaking covenant through idolatry and injustice. When the people didn\'t repent, judgment came as promised.',
            passageReference: '2 Kings 17:7-23, Jeremiah 25:8-11'
          },
          {
            id: 'ots5-2',
            type: 'true-false',
            question: 'The book of Lamentations shows that God completely abandoned Israel during exile.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'While Lamentations expresses the pain and devastation of exile, the book also includes affirmations of God\'s mercies and faithfulness, and prophecies promised restoration.',
            passageReference: 'Lamentations 3:22-24'
          },
          {
            id: 'ots5-3',
            type: 'multiple-choice',
            question: 'What did the prophets promise regarding Israel and Judah\'s future?',
            options: [
              'Permanent destruction and abandonment',
              'Immediate restoration without judgment',
              'God would not completely destroy them; a remnant would be restored',
              'Return to Canaan was impossible'
            ],
            correctAnswer: 2,
            explanation: 'Despite exile and judgment, the prophets promised that God would not completely destroy His people but would preserve a remnant and restore them.',
            passageReference: 'Jeremiah 29:10-14, Isaiah 43:5-7'
          }
        ]
      }
    },
    {
      id: 'ot-stories-week6',
      weekNumber: 6,
      title: 'Restoration & Hope',
      objectives: [
        'Understand God\'s restoration of Israel after exile',
        'Learn how remnant theology and messianic hope developed',
        'Grasp the theological significance of return'
      ],
      passages: ['Ezra 1:1-11', 'Nehemiah 1:1-11', 'Zechariah 9:9-12'],
      content: `After seventy years in exile, God raised up Cyrus, king of Persia, to allow Jews to return to Judah and rebuild the temple. Ezra and Nehemiah led the return—not a triumphant conquest but a humble rebuilding. The returning community was small, facing opposition, but they rebuilt the temple and restored Jerusalem's walls. This restoration was partial—Israel never regained the power and glory of David's kingdom, yet it restored the covenant community. The prophets like Zechariah spoke of a future restoration even more complete, promising that God would dwell with His people again. The period after exile saw the development of Judaism as we know it—emphasis on Torah study, synagogue worship (since temple worship was limited), and preparation for the Messiah. The people understood that exile had been judgment but restoration showed God's enduring grace. They lived in hope of fuller restoration and final redemption. The last books of the Old Testament (Chronicles, Ezra, Nehemiah, Malachi) point forward: the story isn't complete. The Messiah remains unfulfilled. The kingdom promised to David awaits its true king. God's people wait in faith for final restoration—a redemption even more complete than the return from exile, accomplished through God's promised Messiah.`,
      keyTakeaways: [
        'God\'s grace appeared in restoration after exile—the covenant community was renewed',
        'The return was partial and humble but demonstrated God\'s faithfulness to His promises',
        'Jewish faith developed deeper understanding of Torah and hope for Messiah during post-exile period',
        'The Old Testament ends with forward-looking hope—awaiting the promised Messiah and final redemption'
      ],
      reflection: 'How does the restoration story speak to your own times of failure, repentance, and renewal?',
      resources: ['Ezra 1, Nehemiah 1, Zechariah 9 study', 'Reflection on God\'s patience and restoration'],
      quiz: {
        id: 'ot-stories-week6-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots6-1',
            type: 'multiple-choice',
            question: 'What allowed the Jews to return from exile?',
            options: [
              'Military victory over Babylon',
              'Cyrus, king of Persia, decreed that Jews could return and rebuild the temple',
              'The exile ended naturally after seventy years',
              'Jewish leaders bought their freedom'
            ],
            correctAnswer: 1,
            explanation: 'God raised up Cyrus, king of Persia, to decree that Jews could return to Judah and rebuild the temple—demonstrating God\'s control of history and faithfulness to covenant.',
            passageReference: 'Ezra 1:1-4'
          },
          {
            id: 'ots6-2',
            type: 'true-false',
            question: 'The restoration after exile immediately returned Israel to power and glory equal to David\'s kingdom.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'The return was partial and humble. While the temple was rebuilt, Israel never regained its former political power. This prepared God\'s people for hope in the promised Messiah.',
            passageReference: 'Haggai 2:3'
          },
          {
            id: 'ots6-3',
            type: 'multiple-choice',
            question: 'What does the end of the Old Testament reveal about God\'s plan?',
            options: [
              'The story is complete and finished',
              'God\'s people should despair—no hope remains',
              'The story points forward—the promised Messiah and final redemption remain unfulfilled',
              'God\'s covenant is revoked'
            ],
            correctAnswer: 2,
            explanation: 'The Old Testament ends with forward-looking hope. The promise to David awaits its true king; messianic prophecies await fulfillment; God\'s final redemption is still coming.',
            passageReference: 'Malachi 3:1, 4:5-6'
          }
        ]
      }
    },
    {
      id: 'ot-stories-week7',
      weekNumber: 7,
      title: 'Wisdom & Worship',
      objectives: [
        'Understand Old Testament wisdom literature',
        'Learn about worship and prayer in the Psalms',
        'Grasp how God\'s people expressed faith in writing'
      ],
      passages: ['Proverbs 1:1-10', 'Psalm 23:1-6', 'Job 1:1-2:13'],
      content: `Alongside historical narrative, the Old Testament contains wisdom literature—books that teach practical godliness and understanding. Proverbs offers concise wisdom about relationships, work, finances, and living wisely. The book of Job grapples with theodicy—why righteous people suffer if God is good and powerful. Ecclesiastes explores the meaning of life under the sun and concludes that fearing God and keeping His commands is humanity's ultimate purpose. The Psalms are songs and prayers expressing the full range of human emotion toward God—praise, lament, thanksgiving, petition, even anger and doubt. Psalm 23 expresses confidence in God's care: "The Lord is my shepherd, I lack nothing." Psalm 42 expresses longing: "As the deer pants for streams of water, so my soul pants for you, my God." Psalm 88 expresses darkness: "Why do you hide your face from me?" These diverse expressions show that authentic faith includes honest wrestling with God, not just positive affirmations. The wisdom literature and Psalms model how God's people process faith practically and emotionally. They teach that fearing God—recognizing His authority and reverencing His character—is the beginning of wisdom. They show how to live well in a complex world, how to worship genuinely, and how to maintain faith through difficulty.`,
      keyTakeaways: [
        'Proverbs offers practical wisdom for living well before God',
        'The Psalms express the full range of human emotion and prayer—praise, lament, thanksgiving, petition',
        'Job and Ecclesiastes grapple with difficult questions about suffering and meaning',
        'Fear of God—reverence for His authority and character—is the foundation of true wisdom'
      ],
      reflection: 'Which Psalm resonates most with your current spiritual experience? Why?',
      resources: ['Proverbs 1-3, Psalm 23, 42, 88 study', 'Reflection on wisdom and honest prayer'],
      quiz: {
        id: 'ot-stories-week7-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots7-1',
            type: 'multiple-choice',
            question: 'What is the central theme of the book of Proverbs?',
            options: [
              'Accumulating wealth and power',
              'Avoiding all difficulty and hardship',
              'Fear of God and living wisely before Him',
              'Questioning whether God is good'
            ],
            correctAnswer: 2,
            explanation: '"The fear of the Lord is the beginning of wisdom"—Proverbs teaches that reverence for God\'s authority and character is foundational to living well.',
            passageReference: 'Proverbs 1:7, 9:10'
          },
          {
            id: 'ots7-2',
            type: 'true-false',
            question: 'The Psalms only express positive emotions like praise and thanksgiving.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'The Psalms express the full range of human emotion—praise, thanksgiving, but also lament, anger, doubt, and questions. Authentic faith is honest with God.',
            passageReference: 'Psalm 42:5, 88:1-18'
          },
          {
            id: 'ots7-3',
            type: 'multiple-choice',
            question: 'What question does the book of Job primarily address?',
            options: [
              'How to become wealthy',
              'How to avoid suffering',
              'Why righteous people suffer if God is good and all-powerful',
              'How to achieve perfect morality'
            ],
            correctAnswer: 2,
            explanation: 'Job explores the problem of innocent suffering. Job suffers terribly despite his righteousness, raising questions about God\'s justice that the book ultimately resolves in mystery and faith.',
            passageReference: 'Job 1:1, 42:1-6'
          }
        ]
      }
    },
    {
      id: 'ot-stories-week8',
      weekNumber: 8,
      title: 'Course Review & OT Connections',
      objectives: [
        'Synthesize Old Testament major narratives',
        'Connect OT themes to New Testament fulfillment',
        'Understand how the full biblical story unfolds'
      ],
      passages: ['2 Timothy 3:14-17', 'Luke 24:25-27', 'Hebrews 11:39-40'],
      content: `Over the past eight weeks, we've journeyed through the Old Testament's greatest stories: Creation and Fall, Abraham's covenant faith, Exodus liberation, David's kingdom, exile and restoration, and wisdom's pursuit. These aren\'t disconnected tales but a coherent narrative revealing God's character and plan. Creation shows God's power and humanity's design. The Fall reveals sin's entrance and grace's emergence. Abraham demonstrates faith rewarded. Exodus shows liberation and covenant renewal. The kingdom reveals human failure and God's faithfulness. Exile teaches judgment's reality and restoration's hope. Wisdom teaches fear of God and righteous living. Together, these stories show God's consistency: He initiates covenant, calls people to faithful response, judges disobedience, but never abandons His promises. The New Testament reveals how the entire Old Testament points to Jesus. Jesus tells His disciples on the Emmaus road: "Beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself" (Luke 24:27). The Messiah promised to David, the deliverer foreshadowed by Exodus, the Passover lamb, the wisdom incarnate—all point to Christ. Yet the OT stories retain their own integrity. They teach us about faith, repentance, covenant, and God's character. They show that God works through history, through ordinary people and extraordinary circumstances, to accomplish His purposes. They invite us into a narrative larger than ourselves—a story of redemption that continues in our own time.`,
      keyTakeaways: [
        'Old Testament stories form a coherent narrative revealing God\'s character and plan',
        'God\'s faithfulness to covenant persists despite human failure',
        'The OT points forward to Christ—He is the fulfillment of its promises',
        'OT stories remain spiritually vital—teaching faith, repentance, and God\'s care'
      ],
      reflection: 'How does seeing the OT as a unified story pointing to Christ deepen your understanding of the Bible?',
      resources: ['Luke 24:25-27, Hebrews 11 study', 'Reflection on how OT stories speak to your faith today'],
      quiz: {
        id: 'ot-stories-week8-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'ots8-1',
            type: 'multiple-choice',
            question: 'How does the New Testament view the Old Testament?',
            options: [
              'As irrelevant ancient history',
              'As pointing forward to and fulfilled by Christ',
              'As contradicted by Christian faith',
              'As optional background for Christian understanding'
            ],
            correctAnswer: 1,
            explanation: 'Jesus taught that the OT Scripture concerning Himself; the NT consistently shows OT prophecies and themes fulfilled in Christ.',
            passageReference: 'Luke 24:25-27'
          },
          {
            id: 'ots8-2',
            type: 'true-false',
            question: 'The main theme of the OT is God\'s punishment and abandonment of His people.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'While the OT includes judgment for disobedience, its overarching theme is God\'s faithfulness—He initiates covenant, perseveres with His people, and fulfills His promises.',
            passageReference: 'Jeremiah 29:11'
          },
          {
            id: 'ots8-3',
            type: 'multiple-choice',
            question: 'What do the OT stories teach Christians today?',
            options: [
              'Outdated historical facts irrelevant to modern faith',
              'About faith, repentance, God\'s character, and covenant faithfulness that remain spiritually vital',
              'Only negative examples to avoid',
              'That God\'s promises are contingent on our perfect obedience'
            ],
            correctAnswer: 1,
            explanation: 'OT stories remain spiritually vital—they teach about genuine faith (Abraham), God\'s power (Exodus), repentance and restoration (exile), and God\'s enduring care.',
            passageReference: '2 Timothy 3:16-17'
          }
        ]
      }
    }
  ]
};

// Bible Overview Course - 12 weeks, Advanced Level
const BIBLE_OVERVIEW: StudyGuide = {
  id: 'bible-overview',
  title: 'Bible Overview',
  description: 'Comprehensive survey of all 66 books. Understand the structure, major themes, and how the entire biblical story unfolds from Genesis to Revelation.',
  difficulty: 'advanced',
  weeks: 12,
  estimatedHours: 20,
  syllabus: 'This 12-week comprehensive course surveys all 66 books of the Bible. Weeks 1-4 cover OT structure and major themes. Weeks 5-8 explore NT development. Weeks 9-12 examine overarching biblical themes and the complete story.',
  tags: ['bible', 'survey', 'comprehensive', 'advanced'],
  learningObjectives: [
    'Understand the structure and organization of all 66 books',
    'Know the major themes and historical periods of Scripture',
    'Trace how biblical themes develop from OT through NT',
    'Grasp the unity of Scripture and how the story points to Christ',
    'Develop ability to navigate and understand the entire Bible'
  ],
  lessons: [
    {
      id: 'bible-overview-week1',
      weekNumber: 1,
      title: 'OT Structure: The Five Books of Moses',
      objectives: [
        'Understand the Pentateuch (first five books) and their structure',
        'Learn the major narratives and laws in the Torah',
        'Grasp the foundational themes established in Genesis-Deuteronomy'
      ],
      passages: ['Genesis 1:1', 'Exodus 3:1-15', 'Leviticus 19:1-2', 'Numbers 1:1-3', 'Deuteronomy 4:1-40'],
      content: `The first five books of the Bible (Genesis, Exodus, Leviticus, Numbers, Deuteronomy) are called the Pentateuch or Torah (Law). These foundational books establish the entire biblical narrative. Genesis narrates creation, humanity's fall, and God's covenant with Abraham—establishing themes of God's sovereignty, human responsibility, and covenant. Exodus tells of Israel's slavery in Egypt and miraculous liberation, establishing God's redemptive power and covenant renewal at Sinai. Leviticus details cultic laws and sacrificial system, establishing how Israel approaches God through worship and ritual purity. Numbers records Israel's wilderness wandering and God's provision despite complaining and disobedience. Deuteronomy recounts Moses' farewell addresses, renewing the covenant and emphasizing obedience to God's commandments. Together, these five books establish the foundational narrative (creation-fall-covenant-liberation) and framework (law-covenant-obedience) that structures the rest of Scripture. Understanding the Torah is essential to understanding the entire Bible. Jesus taught "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them" (Matthew 5:17). The Torah isn't abandoned but fulfilled in Christ.`,
      keyTakeaways: [
        'The Torah/Pentateuch establishes creation, sin, covenant, and liberation',
        'The law reveals God\'s character and calls Israel to holy living',
        'These five books provide the narrative framework for all subsequent Scripture',
        'NT fulfillment and grace don\'t contradict but fulfill the Torah\'s promises'
      ],
      reflection: 'How do the foundational themes of the Torah shape your understanding of the entire Bible?',
      resources: ['Genesis-Deuteronomy quick overview', 'Reflection on how Torah themes develop throughout Scripture'],
      quiz: {
        id: 'bible-overview-week1-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'bo1-1',
            type: 'multiple-choice',
            question: 'What are the first five books of the Bible called?',
            options: [
              'The Prophets',
              'The Gospels',
              'The Torah or Pentateuch',
              'The Epistles'
            ],
            correctAnswer: 2,
            explanation: 'The first five books (Genesis, Exodus, Leviticus, Numbers, Deuteronomy) are called the Torah (Law) or Pentateuch (five books).',
            passageReference: 'Various references to "the Law"'
          },
          {
            id: 'bo1-2',
            type: 'true-false',
            question: 'Leviticus primarily tells narrative stories like Genesis and Exodus do.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Leviticus focuses on laws and ritual procedures for worship and purity, not on narratives.',
            passageReference: 'Leviticus 1-27'
          },
          {
            id: 'bo1-3',
            type: 'multiple-choice',
            question: 'What major covenant is established at Sinai in Exodus?',
            options: [
              'The Abrahamic covenant',
              'The Davidic covenant',
              'The covenant with conditions: obedience brings blessing, disobedience brings judgment',
              'No covenant is established at Sinai'
            ],
            correctAnswer: 2,
            explanation: 'At Sinai, God renews covenant with Israel, giving the Law and establishing conditional covenant: "If you obey my voice and keep my covenant..."',
            passageReference: 'Exodus 19:5-6'
          }
        ]
      }
    },
    {
      id: 'bible-overview-week2',
      weekNumber: 2,
      title: 'OT History: Joshua Through Kings',
      objectives: [
        'Understand Israel\'s conquest of Canaan',
        'Learn the period of judges and Israel\'s struggles',
        'Grasp the establishment and division of the kingdom'
      ],
      passages: ['Joshua 1:1-9', 'Judges 2:11-19', '1 Samuel 8:1-22', '2 Samuel 7:1-17', '1 Kings 12:1-33'],
      content: `After the Torah comes the historical books (Joshua, Judges, 1-2 Samuel, 1-2 Kings, 1-2 Chronicles). Joshua records Israel's conquest of Canaan under Joshua's leadership. The Promised Land is finally possessed. But the book of Judges shows that possession didn't mean settlement. For two centuries, Israel oscillates between faithfulness and faithlessness, turning from God and facing oppression, then repenting and experiencing deliverance through judges (Deborah, Gideon, Samson). Eventually, Israel demands a human king "like other nations" (1 Samuel 8). God grants this request through Samuel, anointing Saul (who fails), then David (the greatest). David's covenant promises an eternal kingdom through his line. But Solomon, David's son, turns to idolatry, causing God to judge the kingdom by dividing it: ten northern tribes (Israel) and two southern (Judah). The remaining historical books (1-2 Kings, 2 Chronicles) trace the divided kingdom's history until both fall into exile. This period demonstrates the cycle: faithfulness brings blessing, unfaithfulness brings judgment, yet God preserves a remnant. The historical books show God's purposes working through history—He raises leaders, judges disobedience, but remains faithful to covenant. They prepare readers to understand exile not as God's abandonment but as covenant judgment and setting for restoration.`,
      keyTakeaways: [
        'Joshua-Judges show the struggle to take and hold the Promised Land',
        'The kingdom period reveals human failure even in great leaders like David and Solomon',
        'Division and exile are covenant judgment, but God preserves a remnant',
        'History serves theological purpose—showing God\'s faithfulness through cycles of sin and restoration'
      ],
      reflection: 'What cycles of faithfulness and unfaithfulness do you see in your own spiritual journey?',
      resources: ['Joshua, Judges, 1-2 Samuel, 1-2 Kings overview', 'Timeline of kingdom period'],
      quiz: {
        id: 'bible-overview-week2-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'bo2-1',
            type: 'multiple-choice',
            question: 'What is the primary pattern of the book of Judges?',
            options: [
              'Continuous victory and progress',
              'Cycles of sin-judgment-deliverance-faithfulness',
              'Exclusively military conquest narratives',
              'Purely legal and judicial matters'
            ],
            correctAnswer: 1,
            explanation: 'Judges records repeated cycles: Israel sins (worships idols), faces oppression, repents, and is delivered by a judge God raises up.',
            passageReference: 'Judges 2:11-19'
          },
          {
            id: 'bo2-2',
            type: 'true-false',
            question: 'The establishment of the kingdom in Israel was God\'s original plan for Israel\'s government.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Israel demanded a king "like other nations," and God granted their request through Samuel. God\'s ideal was theocratic rule, but He permitted monarchy.',
            passageReference: '1 Samuel 8:1-22'
          },
          {
            id: 'bo2-3',
            type: 'multiple-choice',
            question: 'What caused the kingdom of Israel to divide after Solomon?',
            options: [
              'Military defeat',
              'Economic collapse',
              'Solomon\'s idolatry and turning from God caused God to judge by dividing the kingdom',
              'Popular vote by the people'
            ],
            correctAnswer: 2,
            explanation: 'Solomon\'s idolatry and turning from God prompted God to judge by dividing the kingdom, though God preserved a remnant (Judah) for David\'s sake.',
            passageReference: '1 Kings 11:1-13'
          }
        ]
      }
    },
    {
      id: 'bible-overview-week3',
      weekNumber: 3,
      title: 'OT Prophecy: The Prophetic Books',
      objectives: [
        'Understand the role and types of Old Testament prophets',
        'Learn the major prophets (Isaiah, Jeremiah, Ezekiel, Daniel)',
        'Grasp prophetic themes: warning, judgment, and restoration'
      ],
      passages: ['Isaiah 1:1-20', 'Jeremiah 1:1-19', 'Ezekiel 1:1-28', 'Daniel 1:1-21'],
      content: `Alongside the historical narrative, God sent prophets to call Israel back to covenant faithfulness. The prophetic books (Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi) speak God's word to specific situations. Prophets like Isaiah and Jeremiah warned of exile if Israel didn't repent. Ezekiel and Daniel ministered during exile, comforting with promises of restoration. The prophets' central message: "Turn from idolatry and injustice, or face judgment; but repent and receive restoration." Prophecy includes foretelling (predicting future events) and forth-telling (proclaiming God's message). The former is more dramatic but the latter is the prophets' primary role—speaking God's truth to their generation. Prophecy also includes messianic prediction: prophets foresaw a descendant of David who would rule eternally, a suffering servant who would bear sin, a coming deliverer. These predictions create anticipation pointing to Jesus. Understanding the prophetic books helps readers see that God didn't arbitrarily judge Israel but repeatedly warned through prophets, giving opportunity to repent. Judgment came as promised, but so did restoration. The prophets also point forward to ultimate restoration and the coming Messiah.`,
      keyTakeaways: [
        'Prophets were God\'s spokespersons calling Israel to faithfulness',
        'Primary prophetic role is forth-telling (proclaiming God\'s word) more than foretelling (predicting)',
        'Prophets warned of judgment but also promised restoration and a coming Messiah',
        'Messianic prophecies in the OT point forward to and are fulfilled in Jesus'
      ],
      reflection: 'How do the prophets\' calls to repentance speak to your own need for turning from sin?',
      resources: ['Isaiah 1, Jeremiah 1, Ezekiel 1, Daniel 1 study', 'Overview of all 17 prophetic books'],
      quiz: {
        id: 'bible-overview-week3-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'bo3-1',
            type: 'multiple-choice',
            question: 'What was the primary role of Old Testament prophets?',
            options: [
              'To predict the future with complete accuracy',
              'To serve as political leaders',
              'To proclaim God\'s message to their generation, calling people to faithfulness',
              'To replace the priesthood'
            ],
            correctAnswer: 2,
            explanation: 'Prophets were spokespersons for God, proclaiming His message (forth-telling) to their generation, calling for repentance and promising restoration.',
            passageReference: 'Jeremiah 1:17-19'
          },
          {
            id: 'bo3-2',
            type: 'true-false',
            question: 'Jeremiah\'s prophecies of exile were meant to provide comfort to Israel.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Jeremiah warned of exile as judgment, but he also promised restoration after seventy years—comfort came through promise, not denial of judgment.',
            passageReference: 'Jeremiah 25:11-12, 29:10-14'
          },
          {
            id: 'bo3-3',
            type: 'multiple-choice',
            question: 'What do messianic prophecies in the OT reveal?',
            options: [
              'That no savior would come',
              'Expectations of a coming deliverer—a descendant of David who would reign eternally and bear the sins of people',
              'Only mythological hopes without historical basis',
              'That Israel would never need redemption'
            ],
            correctAnswer: 1,
            explanation: 'OT prophets foresaw a coming Messiah—a son of David who would reign forever, a suffering servant who would bear sin, a deliverer for God\'s people.',
            passageReference: 'Isaiah 53:1-12, Micah 5:2'
          }
        ]
      }
    },
    {
      id: 'bible-overview-week4',
      weekNumber: 4,
      title: 'OT Wisdom & Poetry',
      objectives: [
        'Understand wisdom literature and poetic books',
        'Learn how Psalms, Proverbs, Job, Ecclesiastes function',
        'Grasp how Israel processed faith, suffering, and meaning'
      ],
      passages: ['Psalm 1:1-6', 'Proverbs 1:1-7', 'Job 42:1-6', 'Ecclesiastes 12:13-14'],
      content: `The Old Testament includes books of poetry and wisdom that aren't historical narrative or prophecy but reflective literature. The Psalms (150 poems/prayers) express the full range of human emotion toward God—praise, lament, thanksgiving, petition, worship. Proverbs offers short, memorable teachings about living wisely before God. Job grapples with suffering and theodicy through dialogue. Ecclesiastes explores the meaning of life. These books are essential to complete biblical understanding. They show how God's people struggled with real issues—suffering without apparent cause, the meaning of existence, how to live well. They teach that authentic faith isn't immune from questions; it wrestles honestly with God. The wisdom books also emphasize the practical application of faith—Proverbs teaches that fearing God and walking in wisdom produces blessing. These books complement the historical and prophetic books by showing individual and communal wrestling with faith. They invite readers into their struggles and prayers. They validate that doubt, lament, and questioning are legitimate parts of authentic faith when ultimately they lead to deeper trust in God. Understanding the full OT requires not just historical narrative and prophecy but also the wisdom literature showing how real people lived out faith in complex circumstances.`,
      keyTakeaways: [
        'Wisdom literature addresses practical living, suffering, meaning, and authentic prayer',
        'Psalms model honest prayer—expressing the full range of human emotion to God',
        'Proverbs teaches practical wisdom flowing from fear of God',
        'Books like Job and Ecclesiastes validate lament, doubt, and questioning as part of authentic faith'
      ],
      reflection: 'Which Psalm or Proverb most resonates with your current spiritual experience?',
      resources: ['Psalms, Proverbs, Job, Ecclesiastes overview', 'Reflection on wisdom and authentic prayer'],
      quiz: {
        id: 'bible-overview-week4-quiz',
        passingScore: 75,
        allowRetake: true,
        explanations: true,
        questions: [
          {
            id: 'bo4-1',
            type: 'multiple-choice',
            question: 'What distinguishes the Psalms from other biblical books?',
            options: [
              'They are historical narratives',
              'They are laws and commands',
              'They are prayers and poetry expressing human emotion toward God',
              'They are purely prophetic predictions'
            ],
            correctAnswer: 2,
            explanation: 'The Psalms are poems/prayers expressing the full range of human emotion toward God—praise, lament, thanksgiving, petition, doubt, confidence.',
            passageReference: 'Psalms 1-150'
          },
          {
            id: 'bo4-2',
            type: 'true-false',
            question: 'The book of Job teaches that righteous people never suffer.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Job directly challenges the assumption that righteousness guarantees comfort. Job suffers terribly despite his righteousness, and the book explores why.',
            passageReference: 'Job 1:1'
          },
          {
            id: 'bo4-3',
            type: 'multiple-choice',
            question: 'According to Proverbs, what is "the beginning of wisdom"?',
            options: [
              'Academic learning',
              'Wealth and power',
              'Fear of the Lord',
              'Avoiding all difficulty'
            ],
            correctAnswer: 2,
            explanation: '"The fear of the Lord is the beginning of wisdom"—reverence for God\'s authority and character is foundational to living wisely.',
            passageReference: 'Proverbs 1:7, 9:10'
          }
        ]
      }
    }
  ]
};

export const STUDY_GUIDES_DATA: StudyGuide[] = [
  GOSPEL_BASICS,
  PRAYER_101,
  NT_ESSENTIALS,
  OT_STORIES,
  BIBLE_OVERVIEW
];

export function generateCompleteStudyGuidesData(): StudyGuide[] {
  // Return all 5 complete courses
  return STUDY_GUIDES_DATA;
}
