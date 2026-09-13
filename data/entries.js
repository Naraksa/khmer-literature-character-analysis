const entries = [
  {
    id: "tum",
    character: "ទុំ",
    role: "តួឯកប្រុស",
    bookTitle: "រឿងទុំទាវ (Tum Teav)",
    author: "ព្រះភិក្ខុសោម (Preah Botumthera Som)",
    publishedYear: "1915",
    image: "/images/tum.jpg",
    plotSummary:
      "នេនទុំជាយុវជនមានទេពកោសល្យខាងសំនៀង និងស្នេហាបរិសុទ្ធ ដែលហ៊ានលះបង់ជីវិតបួស និងប្រឈមនឹងឧបសគ្គវណ្ណៈដើម្បីស្នេហាស្មោះស្ម័គ្រជាមួយនាងទាវ។",
    perspectives: [
      {
        contributor: "Noeumsophy Reaksmey",
        place: "Online discussion",
        analysis:
          "Tum is deeply devoted to Teav. His love is so powerful that he is willing to sacrifice everything, even his own life. Although his passion leads him toward tragedy, his unwavering commitment shows the strength of true love.។",
      },
    ],
  },
  {
    id: "som",
    character: "សម",
    role: "មិត្តភក្តិស្មោះស្ម័គ្រ",
    bookTitle: "រឿងព្រះអាទិត្យថ្មីរះលើផែនដីចាស់​",
    author: "ព្រះភិក្ខុសោម (Preah Botumthera Som)",
    publishedYear: "1915",
    image: "/images/som.jpg",
    plotSummary:
      "សមជាតួអង្គដែលជួបប្រទះបញ្ហា និងឧបសគ្គជាច្រើនក្នុងការរស់នៅ។ ទោះបីជាមានភាពលំបាកក៏ដោយ ការតស៊ូមិនរាថយបាននាំមកនូវជីវិតដ៏សមប្រកប។",
    perspectives: [
      {
        contributor: "Noeumsophy Reaksmey",
        place: "Online discussion",
        analysis: "Som is a compassionate person who cares deeply about others. Rather than focusing only on his own interests, he shows kindness and sympathy toward people around him. His character demonstrates the importance of humanity, generosity, and concern for others.",
      },
    ],
  },
  {
    id: "chao-chet",
    character: "ចៅចិត្រ",
    role: "តួឯកប្រុស",
    bookTitle: "រឿងកុលាបប៉ៃលិន (Koulap Pailin)",
    author: "ញ៉ុក ថែម (Nhok Them)",
    publishedYear: "1943",
    image: "/images/chao-chet.jpg",
    plotSummary:
      "ចៅចិត្រជាកូនកំព្រាប្រកបដោយចរិយាសម្បត្តិ សេចក្តីឧស្សាហ៍ព្យាយាម និងភាពស្មោះត្រង់ក្នុងការងារជីកត្បូងនៅប៉ៃលិន រហូតឈ្នះចិត្តអ្នកដទៃ និងនាងឃុននារី។",
    perspectives: [
      {
        contributor: "Noeumsophy Reaksmey",
        place: "Online discussion",
        analysis:
          "Chav Chet is a diligent person who never gives up when facing difficulties. Through continuous hard work and determination, he proves his abilities and earns respect. His character shows that perseverance and effort can overcome social and economic disadvantages.",
      },
    ],
  },
  {
    id: "teav",
    character: "ទាវ",
    role: "តួឯកស្រី",
    bookTitle: "រឿងទុំទាវ (Tum Teav)",
    author: "ព្រះភិក្ខុសោម (Preah Botumthera Som)",
    publishedYear: "1915",
    image: "/images/teav.jpg",
    plotSummary:
      "នាងទាវជានារីរូបស្រស់សោភា មានចិត្តស្មោះមួយនឹងមួយ និងហ៊ានក្រោកឈរតស៊ូប្រឆាំងនឹងផ្នត់គំនិតបុរាណដើម្បីសិទ្ធិសេរីភាពជ្រើសរើសគូស្រករ។",
    perspectives: [
      {
        contributor: "Noeumsophy Reaksmey",
        place: "Online discussion",
        analysis:
          "Teav is defiant because she dares to challenge the social and family expectations imposed on her. Despite the consequences, she remains loyal to Tum and fights for her love. Her courage demonstrates her desire for freedom and personal choice.",
      },
    ],
  },
  {
    id: "vithavy",
    character: "វិធាវី",
    role: "តួឯកស្រី",
    bookTitle: "រឿងផ្កាស្រពោន (Phka Sropoun)",
    author: "នូ ហាច (Nou Hach)",
    publishedYear: "1947",
    image: "/images/vithavy.jpg",
    plotSummary:
      "វិធាវីជានារីស្លូតបូត កតញ្ញូ ដែលត្រូវម្តាយបង្ខំចិត្តឱ្យរៀបការជាមួយអ្នកមាន។ ដោយមិនហ៊ានប្រឆាំងនឹងទំនៀមទម្លាប់ នាងសុខចិត្តរងទុក្ខរហូតក្ស័យជីវិត។",
    perspectives: [
      {
        contributor: "Noeumsophy Reaksmey",
        place: "Online discussion",
        analysis:
          "Vitheavy is submissive because she accepts the pressure and expectations imposed by her family and society. Unlike Teav, she does not openly challenge them. Instead, she chooses to endure her suffering and ultimately chooses death rather than resistance.",
      },
    ],
  },

  {
    id: "Khun-Neary",
    character: "ឃុន​ នារី",
    role: "តួឯកស្រី",
    bookTitle: "កុលាប​ប៉ៃលិន (Koulap Pailin)",
    author: "ញ៉ុក ថែម (Nhok Them)",
    publishedYear: "1943",
    image: "/images/Khun Neary.webp",
    plotSummary: "ឃុន នារី​ជាកូនស្រីរបស់លោកហ្លួងរតនៈសម្បត្តិ​ដែលមានរូបស្រស់សោភា។ ដើមឡើយនាងមានអាកប្បកិរិយារើសអើងលើចៅចិត្ត​ ប៉ុន្តែបន្ទាប់​ពីស្គាល់គ្នាយូរ ហើយដោយចៅចិត្រហ៊ានលះបង់​ជិវិតរបស់ខ្លួនដើម្បីជួយគ្រួសាររបស់នាង​ ឃុន​​ នារីក័បានបាក់ចិត្តស្រឡាញ់ចៅចិត្រ។",
    perspectives: [
      {
        contributor:"Noeumsophy Reaksmey",
        place:"Online Discussion",
        analysis:"Khun Neary is a character that may be criticized by some readers for her initial arrogance and prejudice toward Chao Chet. However, she is also a character that shows growth and change. She learns to appreciate Chao Chet's selflessness and bravery, which leads her to fall in love with him. Her character demonstrates the importance of humility and the ability to change one's perspective.",
      }
    ],
  },
  {
    id: "Chum-Teav-Sren",
    character: "ជុំទាវស្រែន",
    role: "តួឯកស្រី",
    bookTitle: "តេជោយ៉ត (Techo Yot)",
    author: "ទី​ ជីហួត (Ti Cheu Hout)",
    publishedYear: "1983",
    image: "/images/Techo Yot.jpg",
    plotSummary: "ជុំទាវស្រែន​ជានារីដែលមានរូបសម្បត្តិល្អ និងមានភាពវៃឆ្លាតអាចយកឈ្នះស្តេចសម្រែសងសឹកឱ្យស្វាមីរបស់ខ្លួន តែត្រូវចាញ់​ប្រាជ្ញារបស់តេជោយ៉ត ហើយត្រូវរៀបការជាមួយតេជោយ៉​តដែលជាសិស្សរបស់អតីតស្វាមីរបស់ខ្លួន តេជោមាសដែលបានស្លាប់​ក្នុងសង្គ្រាមជាមួយស្តេចសម្រែ។",
    perspectives: [
      {
        contributor: "Noeumsophy Reaksmey",
        place: "Online Discussion",
        analysis: "Chum Teav Sren is a character that may inspire a lot of readers, especially female readers. She is a clever and beautiful woman who sought revenge for her late husband Techo Meas by herself. Her strategic thinking is amamzing as she is able to kill Sdach Somrea by herself alone without any physical strength. However, she is also a character that is very unlucky as she is forced to marry Techo Yot, who is her late husband's student.",
      }
    ],
  },
  {
    id: "Techo-Yot",
    character: "តេជោយ៉ត",
    role: "តួឯកប្រុស",
    bookTitle: "តេជោយ៉ត (Techo Yot)",
    author: "ទី​ ជីហួត (Ti Cheu Hout)",
    publishedYear: "1983",
    image: "/images/Techo Yot.jpg",
    plotSummary: "តេជោយ៉ត​ជាកូនសិស្សរបស់តេជោមាស​ ដែលមានភាពវៃឆ្លាតអាចយកឈ្នះចិត្តរបស់ជំទាវស្រែនដែលត្រូវជាប្រពន្ធរបស់​តេជោមាសដែលត្រូវជាគ្រូរបស់ខ្លួន។​",
    perspectives: [
      {
        contributor: "Noeumsophy Reaksmey",
        place: "Online Discussion",
        analysis: "Techo Yot is a character that might have been criticized a lot by readers and all khmer literature learners for his act of trying to seduce his teacher's wife. However, he is a character that is very clever and smart. He is able to win the heart of Chum Teav Sren, who is the wife of his teacher Techo Meas, by using his intelligence and wit.",
      }
    ],
  },
];

export default entries;
