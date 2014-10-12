// Generated by CoffeeScript 1.8.0
(function() {
  $(function() {
    var count, currentStatement, onMeClick, onNotMeClick, onReloadClick, onShareClick, render, statements, watches, winner;
    statements = ["My watch: Analogue, definitely not digital.", "I love technology. I want to know how things work.", "I want people to know that my watch is valuable.", "I prefer city breaks to beach holidays.", "I know what Bang & Olufsen audio is and would definitely get some.", "I prefer a leather strap to metal.", "Stopwatch, calendar, altitude: The more features the better.", "Deep inside, I'm a suit, not a creative.", "I want people to go “OH” when they hear which brand my watch is.", "I need my watch to cost less than $100.", "I'm willing to pay more than $500 for my watch.", "Sports are cool. I want my watch to communicate this.", "I like Formula 1.", "I always wanted to fly aeroplanes.", "I have opinions about typography.", "Gold is a nice color.", "I know what Bauhaus design is. And it's rather cool.", "I think riding bicycles is stylish."];
    watches = [
      {
        name: "IWC",
        products: [
          {
            productname: "IWC Portuguese Chronograph Automatic Mens Watch IW371446",
            affiliateid: "B0070LPR8C"
          }, {
            productname: "IWC Portofino Silver Dial Chronograph Brown Leather Mens Watch IW391007",
            affiliateid: "B00AZWYGXK"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test, I'm a design-concious cosmopolitan. What your taste tells about you?",
        result: ["Congrats! You are a design-conscious cosmopolitan! You are at home on the backstreets of Rome as well as the bars of the Upper West Side. You love beautiful things and know how to get them.", "You should definitely buy an IWC watch. Hailing from Schaffhausen, IWC makes some of the more elegant Swiss watches with minimal clutter and none of that overdone bling. Check out these examples!"],
        points: [3, -2, 2, 2, 3, 2, -2, 0, -1, -12, 6, -3, -3, 0, 3, -2, 3, 2],
        total: 0
      }, {
        name: "Rolex",
        products: [
          {
            productname: "Rolex Datejust II Black Roman Dial 18k Yellow Gold Fluted Bezel Two Tone Oyster Bracelet Mens Watch 116333BKRO",
            affiliateid: "B007ISHUQ4"
          }, {
            productname: "Rolex Mens New Style Heavy Band Stainless Steel & 18K Gold Datejust Model 116233 Jubilee Band Fluted Bezel White Diamond Dial",
            affiliateid: "B00BPFJQ9A"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test, I'm not afraid to show that I've made it in life. What your taste tells about you?",
        result: ["Wow, you've got some balls! You've made it in life and are not afraid to show it. You're at home whereever you go 'cause the world is your playground.", "You should definitely buy a Rolex. The number 1 luxury watch of the world, Rolex is a sure-fire conversation starter and a treasure everyone is sure to recognize. Check out these examples!"],
        points: [3, 0, 3, -2, -2, -1, -1, 2, 3, -12, 6, -3, 2, 0, -2, 4, -3, -2],
        total: 0
      }, {
        name: "Timex",
        products: [
          {
            productname: "Timex Originals T2N626 Mens Indiglo PREMIUM ORIGINALS Natural Tan Watch",
            affiliateid: "B005DKHJII"
          }, {
            productname: "Timex Premium Originals Men's watch #T2N793",
            affiliateid: "B007P4YR6M"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test, I don't need big bucks to show my excuisite taste. What your taste tells about you?",
        result: ["You've got classic style! Alas, you might not yet have the budget to match your excuisite taste. But not to worry! With your sense of style you're bound to be a winner!", "You should definitely take a look at Timex watches. An American classic with roots in 1850s Connecticut, Timex offers great classical design at great prices. Check out these examples!"],
        points: [3, -1, -2, 1, 1, 0, -1, 0, -2, 8, -5, -2, -2, 0, 2, -2, 2, 0],
        total: 0
      }, {
        name: "Casio",
        products: [
          {
            productname: "Casio Men's Silver Tone 25 Memory Calculator Databank Watch",
            affiliateid: "B007HHVVCK"
          }, {
            productname: "Casio Dress Digital Mens Watch A168WG9",
            affiliateid: "B002LAS086"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test I should be an electropop star with a startup on the side! What your taste tells about you?",
        result: ["Do you run a DJ app startup? If not, you should! You are the perfect combination of geek and cool, electropop and emotions. And you do love things that go beep, don't you?", "You should definitely look at Casio watches. A digital classic from the 70s onwards, Casio has long been the go-to brand for computer guys with a cool edge. Check out these examples!"],
        points: [-3, 2, -2, 1, -1, -1, 1, -1, 1, 8, -5, -2, -2, 0, 2, -2, -3, 2],
        total: 0
      }, {
        name: "Swatch",
        products: [
          {
            productname: "Swatch Men's SUOL700 Quartz Turquoise Dial Measures Seconds Plastic Watch",
            affiliateid: "B004OVDUKI"
          }, {
            productname: "Swatch Originals Squirrel Rebel Blue Dial Silicone Mens Watch SUON703",
            affiliateid: "B00AGI5QRI"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test, I'll turn your head on the beach with my skills! What your taste tells about you?",
        result: ["We're guessing you've sometimes thought of buying a skateboard. Or just like dancing, hanging out or just an active lifestyle in general. You're the funny guy with not a care in the world. Go on, make 'em smile, that's what you do best!", "You should definitely look at Swatch. Inexpensive European quality in so many colors. Check out these examples!"],
        points: [2, -1, -3, 0, -2, -2, -1, -2, -1, 8, -5, 0, 0, 0, -2, -2, 0, 2],
        total: 0
      }, {
        name: "Jaeger-LeCoultre",
        products: [
          {
            productname: "Jaeger LeCoultre Amvox2 DBS Mens Watch Q192T450",
            affiliateid: "B003KV2EJ6"
          }, {
            productname: "Jaeger LeCoultre Master Compressor Extreme World Chronograph Mens Watch Q1768470",
            affiliateid: "B000LIVR12"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test, I'm the perfect fusion of technology and style. What your taste tells about you?",
        result: ["You always were the little engineer, weren't you? You love to know how stuff works, but you still see the beauty in good design. You know that good function needs good form. You're the guy who builds the better world we all need!", "You should definitely check out Jager-Le Coultre. A Swiss company with a long history of technological breakthoughs, JLC loves that loves to show you what's happening inside their creations but still makes beautiful things. Check out these examples!"],
        points: [3, 3, 2, 1, 2, 2, 0, 2, 2, -12, 5, -3, 1, -1, 1, -2, 2, 0],
        total: 0
      }, {
        name: "Breitling",
        products: [
          {
            productname: "Breitling Men's BTA2536313-G675BKRD Bentley Motors T Chronograph Watch",
            affiliateid: "B004H90L5Y"
          }, {
            productname: "Breitling windrider blackbird mens watch M4435911",
            affiliateid: "B00APKARJY"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test I should be applying to Top Gun right now, 'cause I'm a born pilot. What your taste tells about you?",
        result: ["Swooossh! That's the sound of you soaring! You always liked aeroplanes, maybe even flew one. You have your eyes set in the sky and want to always know which way is up and which way is down. You're co-ordinated and we'd all trust our lives with you!", "You must buy a Breitling watch. Breitling is a Swiss quality brand with a long history in aviation. Basically, if it's in an aeroplane, it's a Breitling. Check out these examples!"],
        points: [3, 2, 2, 0, -1, 2, 2, 2, 1, -12, 5, 1, 2, 4, -2, -2, -3, 2],
        total: 0
      }, {
        name: "Omega",
        products: [
          {
            productname: "Omega Men's 3570.50.00 Speedmaster Professional Mechanical Chronograph Watch",
            affiliateid: "B000EJPDOK"
          }, {
            productname: "Omega Men's 2201.50.00 Seamaster Planet Ocean Automatic Chronometer Watch",
            affiliateid: "B000I5OWVU"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test I'm a real man with style worthy of a Formula 1 pit lane. What your taste tells about you?",
        result: ["The Olympics, Apollo Program, Formula 1. You're the solid guy who likes things to be punctual and things to be real. You're not afraid of a little sweat or even tears, and that's what makes you a winner. You're the guy who saves the day for the rest of us!", "Check out Omega. If a Swiss watch was a regular guy who became a hero, it'd be Omega. Worn on the Moon and Measuring time in the most important spoting events in recent history, Omega is never behind. Check out these examples!"],
        points: [2, 2, 1, -2, -3, -1, 3, 2, 2, -12, 3, 4, 4, 2, -3, -2, -3, -2],
        total: 0
      }, {
        name: "Citizen",
        products: [
          {
            productname: "Citizen Men's BJ7000-52E 'Nighthawk' Stainless Steel Eco-Drive Watch",
            affiliateid: "B00074KYC8"
          }, {
            productname: "Citizen Men's BL5400-52A Eco-Drive Stainless Steel Sport Watch",
            affiliateid: "B002NEFI44"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test I'm an everyday hero, the guy who saves the day for all! What your taste tells about you?",
        result: ["The daily grind can bring you down, but deep inside you are a hero to us all! You want something that's as sporty as you are and doesn't stand out, 'cause that's just showing off, isn't it? You are the backbone of our world.", "Check out Citizen, a go-to classic of dads everywhere! A sure-fire option at the office or anywhere, you can't go wrong with Citizen. Check out these examples!"],
        points: [2, 2, -1, -2, -3, -1, 3, 2, -2, 3, -2, 3, 4, 2, -3, -2, -3, -2],
        total: 0
      }, {
        name: "Danish design",
        products: [
          {
            productname: "Danish Designs Men's IQ12Q723 Stainless Steel Watch",
            affiliateid: "B002IPGJ3C"
          }, {
            productname: "Danish Designs Men's IQ62Q721 Stainless Steel Watch",
            affiliateid: "B002IPGJP0"
          }
        ],
        share: "According to http://WhichBrandIsMe.com watch test I'm a design-perfect blend of Bauhaus and Scandinavia. What your taste tells about you?",
        result: ["If you're not a graphic designer or an architect, you sure could be one! You like smooth lines, buzz with creative ideas and probably wear turtlenecks and large eyeglasses to work. You are the guy who makes things beautiful for all of us!", "Check out Danish Design, a brand with more Scandinavian class than Stellan Skärsgård. DD makes simple, elegant watches with a distinct Scandinavian or 20s German style. Check out these examples!"],
        points: [3, -2, 0, 2, 3, 3, -2, -2, 0, 4, 0, -3, -3, -2, 4, -2, 6, 2],
        total: 0
      }
    ];
    onMeClick = function() {
      count(1);
      return render();
    };
    onNotMeClick = function() {
      count(-1);
      return render();
    };
    onShareClick = function() {
      return FB.ui({
        method: "feed",
        link: "http://whichbrandisme.com",
        name: 'Find out which watch brand is most like you',
        caption: 'Take the WhichBrandIsMe watch test to find out which watch brand fits your personality and style.',
        description: winner.share,
        picture: 'http://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' + winner.products[0].affiliateid + '&Format=_ML160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=whichbrandi0e-20'
      });
    };
    onReloadClick = function() {
      return location.reload(true);
    };
    currentStatement = 0;
    winner = {};
    count = function(sign) {
      if (sign == null) {
        sign = 1;
      }
      _(watches).each(function(w) {
        return w.total += w.points[currentStatement] * sign;
      });
      return currentStatement += 1;
    };
    render = function() {
      var resultHtml;
      if (currentStatement < statements.length) {
        if ($("#container").hasClass("hide")) {
          $("#container").fadeIn(function() {
            return $(this).removeClass("hide");
          });
        }
        $("#js-content").html(Handlebars.compile($("#step-template").html())({
          statement: statements[currentStatement]
        }));
        return $("#js-progress > .meter").animate({
          width: 100 * currentStatement / statements.length + "%"
        });
      } else {
        winner = _(watches).sortBy("total").reverse()[0];
        resultHtml = Handlebars.compile($("#result-template").html())(winner);
        return $("#js-progress > .meter").animate({
          width: "100%"
        }, {
          complete: function() {
            return $("#container").html(resultHtml);
          }
        });
      }
    };
    $(document).on("click", "#js-me", onMeClick).on("click", "#js-notme", onNotMeClick).on("click", "#js-share", onShareClick).on("click", "#js-reload", onReloadClick);
    return render();
  });

}).call(this);
