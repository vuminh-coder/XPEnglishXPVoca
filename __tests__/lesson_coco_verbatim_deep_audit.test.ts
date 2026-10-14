import { describe, it, expect } from "vitest";
import {
  LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED,
  QUIZ_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED,
} from "../features/listening/data/lessons/movies/animation/lesson_coco";

describe("Coco: Miguel & Héctor 'Remember Me' with Mama Coco (mov_ani_05) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: RealLife Lesson Intro & Mexican Cultural Traditions (Segments 0-4)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments[0].text).toContain("Today we are learning English with a beautiful Disney Pixar film, Coco.");
    expect(segments[0].properNouns).toEqual(expect.arrayContaining(["Disney", "Pixar", "Coco"]));

    expect(segments[1].text).toContain("Mexican tradition called the Day of the Dead, celebrated every year to honor deceased ancestors.");
    expect(segments[1].properNouns).toEqual(expect.arrayContaining(["Day of the Dead", "Mexican"]));

    expect(segments[2].text).toContain("Mexican culture is very present in the United States because they're our neighbor to the south");
    expect(segments[2].properNouns).toEqual(expect.arrayContaining(["United States", "Mexico"]));

    expect(segments[3].text).toContain("First, we'll analyze a funny clip full of fantastic vocabulary and phrasal verbs");
    expect(segments[4].text).toContain("Spanish words in the movie will be translated into English on screen in green. Let's jump right in!");
  });

  it("Audit 2: Papel Picado Family Backstory & Cobbler Heritage (Segments 5-17)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments[5].text).toBe("See, a long time ago, there was this family.");
    expect(segments[6].text).toBe("The papa, he was a musician.");
    expect(segments[7].text).toBe("He and his family would sing, and dance, and count their blessings.");
    expect(segments[7].keywords).toContain("count their blessings");

    expect(segments[8].text).toBe("But he also had a dream: to play music for the world.");
    expect(segments[9].text).toBe("And one day, he left with his guitar, and he never returned.");
    expect(segments[10].text).toBe("And the mama? She didn't have time to cry over that walkaway musician!");
    expect(segments[10].keywords).toContain("walkaway musician");

    expect(segments[11].text).toBe("After banishing all music from her life, she rolled up her sleeves and she learned how to make shoes.");
    expect(segments[11].keywords).toEqual(expect.arrayContaining(["banishing music", "rolled up her sleeves", "make shoes"]));

    expect(segments[12].text).toBe("She could have made candy, or fireworks, or sparkly underwear for wrestlers!");
    expect(segments[13].text).toBe("But no, she picked shoes.");
    expect(segments[14].text).toBe("Then she taught her daughter to make shoes, and later, she taught her son-in-law.");
    expect(segments[15].text).toBe("Then her grandkids got roped in. As her family grew, so did the business.");
    expect(segments[16].text).toBe("Music had torn her family apart, but shoes held them together.");

    expect(segments[17].text).toContain("That woman was my great-great-grandmother, Mama Imelda. And that little girl? That's my great-grandmother, Mama Coco.");
    expect(segments[17].properNouns).toEqual(expect.arrayContaining(["Mama Imelda", "Mama Coco"]));
  });

  it("Audit 3: Vocabulary Breakdown & Cultural Lore (Segments 18-23)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments[18].text).toContain("'count their blessings' means to be grateful for the good things in your life rather than focusing on troubles.");
    expect(segments[19].text).toContain("The idiom 'roll up one's sleeves' means to prepare yourself physically and mentally to work hard on a challenging task.");
    expect(segments[20].text).toContain("When someone 'gets roped in', it means they are persuaded, recruited, or pressured into helping with a task");

    expect(segments[21].text).toContain("To 'tear something apart' means to shatter harmony or divide people violently, whereas 'hold together' means maintaining unity.");
    expect(segments[22].text).toContain("In Mexican tradition, an ofrenda is a home altar decorated with photos, candles, and favorite foods to welcome the spirits of ancestors.");
    expect(segments[22].keywords).toEqual(expect.arrayContaining(["ofrenda", "home altar", "spirits of ancestors"]));

    expect(segments[23].text).toContain("Marigold petals, called cempasuchil, are scattered to create a glowing path of scent and color guiding the departed souls back home.");
    expect(segments[23].keywords).toEqual(expect.arrayContaining(["marigold petals", "cempasuchil", "glowing path"]));
  });

  it("Audit 4: Connected Speech, Flapped T & Lucha Libre Culture (Segments 24-28)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments[24].text).toContain("Notice connected speech in natural spoken English: 'rolled up her' links together smoothly into /roʊld ʌp ər/ with /h/ deletion.");
    expect(segments[24].keywords).toContain("connected speech");

    expect(segments[25].text).toContain("Notice the flapped T: in phrases like 'could have made it', American speakers flap the T and reduce 'have' to a quick schwa sound.");
    expect(segments[26].text).toContain("The coach asks: which phrasal verb means to eliminate or forbid something completely from your life? Banishing, rolling up, or roping in?");
    expect(segments[27].text).toContain("Banish means to officially expel, condemn, or permanently get rid of something, exactly as Mama Imelda banished all music.");

    expect(segments[28].text).toContain("The phrase 'sparkly underwear for wrestlers' is a humorous nod to Mexican Lucha Libre, famous for flamboyant masked gladiators.");
    expect(segments[28].properNouns).toEqual(expect.arrayContaining(["Lucha Libre", "Mexican"]));
  });

  it("Audit 5: Crossing to the Land of the Dead & The Final Death Lore (Segments 29-35)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments[29].text).toContain("Miguel accidentally crosses over the mystical bridge of glowing marigold petals and enters the mesmerizing Land of the Dead.");
    expect(segments[29].properNouns).toEqual(expect.arrayContaining(["Miguel", "Land of the Dead"]));

    expect(segments[30].text).toContain("There, he encounters Hector, a charming yet desperate skeleton struggling to find a way to visit the living world.");
    expect(segments[31].text).toContain("Why can't you cross the marigold bridge, Hector? Because no one put my picture on an ofrenda back home!");

    expect(segments[32].text).toBe(
      "When there's no one left in the living world who remembers you, you disappear from this world entirely. We call it the Final Death."
    );
    expect(segments[32].properNouns).toContain("Final Death");

    expect(segments[33].text).toContain("Our bones turn into radiant golden dust, and our spirits fade into the unknown, never to be seen again.");
    expect(segments[34].text).toContain("Hector's bones begin to flicker with golden light as his beloved daughter Coco slowly begins to forget him with age.");
    expect(segments[35].text).toContain("I just want to see my Coco one last time, to know that she still remembers her papa who loved her with all his heart.");
  });

  it("Audit 6: Academy Award-Winning Song 'Remember Me' (Segments 36-43)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments[36].text).toContain("Now let's examine the Academy Award-winning song 'Remember Me', composed by Kristen Anderson-Lopez and Robert Lopez.");
    expect(segments[36].properNouns).toEqual(expect.arrayContaining(["Remember Me", "Kristen Anderson-Lopez", "Robert Lopez"]));

    expect(segments[37].text).toBe("Remember me, though I have to say goodbye.");
    expect(segments[38].text).toBe("Remember me, don't let it make you cry.");
    expect(segments[39].text).toBe("For even if I'm far away, I hold you in my heart.");
    expect(segments[40].text).toBe("I sing a secret song to you each night we are apart.");
    expect(segments[41].text).toBe("Remember me, though I have to travel far.");
    expect(segments[42].text).toBe("Each time you hear a sad guitar, know that I'm with you the only way that I can be.");
    expect(segments[43].text).toBe("Until you're in my arms again, remember me.");
  });

  it("Audit 7: Climax Resolution, Mamá Coco's Reawakening & Fluency Tips (Segments 44-49)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments[44].text).toContain("Back in the living world, Miguel dashes into Mama Coco's bedroom, determined to save Hector from the Final Death before sunrise.");
    expect(segments[45].text).toBe("Mama Coco, please! You have to remember him! Your papa loved you so much!");

    expect(segments[46].text).toContain("Miguel gently strums the white guitar and sings 'Remember Me' through tears, awakening her fading memories.");
    expect(segments[47].text).toContain("Mama Coco smiles, joins the melody, and reveals the hidden letters and torn photograph of her beloved papa Hector.");

    expect(segments[48].text).toContain("The 3 Keys to mastering spoken English are vocabulary, connected speech, and emotional cultural immersion.");
    expect(segments[49].text).toContain("Keep practicing every single day, enjoy Pixar storytelling, and we'll see you in our next lesson with UP!");
    expect(segments[49].properNouns).toEqual(expect.arrayContaining(["Pixar", "UP"]));
  });
});
