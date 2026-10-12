import subprocess
import json
import re

SEARCH_QUERIES = {
    # ANIMATION
    "lesson_inside_out_joy_sadness_anxiety_breakthrough.ts": "Inside Out Joy and Sadness core memories scene HD",
    "lesson_soul_the_spark_and_ocean_parable.ts": "Soul Pixar ocean fish parable scene",
    "lesson_ratatouille_anton_ego_food_review_monologue.ts": "Ratatouille Anton Ego review monologue scene",
    "lesson_coco_remember_me_with_mama_coco_extended.ts": "Coco Remember Me with Mama Coco scene HD",
    "lesson_up_carl_and_ellie_thanks_for_adventure.ts": "Up Carl and Ellie thanks for the adventure scene HD",
    "lesson_zootopia_judy_nick_carrot_pen_confession.ts": "Zootopia Judy and Nick apology carrot pen scene",
    "lesson_finding_nemo_dory_just_keep_swimming.ts": "Finding Nemo Just Keep Swimming scene",
    "lesson_tangled_lantern_festival_i_see_the_light.ts": "Tangled I See the Light lantern boat scene",
    "lesson_walle_i_dont_want_to_survive_i_want_to_live.ts": "Wall-E I don't want to survive I want to live scene",
    "lesson_monsters_inc_goodbye_boo_emotional_cut.ts": "Monsters Inc Sulley saying goodbye to Boo scene HD",

    # INSPIRATIONAL
    "lesson_dead_poets_society_carpe_diem_captain.ts": "Dead Poets Society Carpe Diem Robin Williams scene",
    "lesson_shawshank_redemption_get_busy_living_pacific.ts": "Shawshank Redemption Get busy living or get busy dying scene",
    "lesson_the_intern_ben_whittacker_gentleman_wisdom.ts": "The Intern Robert De Niro Ben Whittacker best scene",
    "lesson_whiplash_there_are_no_two_words_harmful.ts": "Whiplash there are no two words more harmful than good job scene",
    "lesson_theory_of_everything_where_there_is_life_hope.ts": "The Theory of Everything where there is life there is hope speech",
    "lesson_a_beautiful_mind_nobel_prize_speech.ts": "A Beautiful Mind Nobel Prize acceptance speech John Nash",
    "lesson_cast_away_keep_breathing_tomorrow_sun_rises.ts": "Cast Away keep breathing tomorrow the sun will rise Tom Hanks",
    "lesson_scent_of_a_woman_al_pacino_baird_school_defense.ts": "Scent of a Woman Al Pacino speech at Baird school",
    "lesson_12_angry_men_juror_8_first_doubt_sequence.ts": "12 Angry Men Juror 8 reasonable doubt scene Henry Fonda",

    # SITCOMS
    "lesson_friends_the_iconic_apartment_bet_trivia.ts": "Friends apartment bet trivia game scene",
    "lesson_friends_best_of_chandler_bing_sarcasm.ts": "Friends Chandler Bing best sarcastic moments",
    "lesson_modern_family_best_of_phil_dunphy_dad.ts": "Modern Family Phil Dunphy best dad moments",
    "lesson_modern_family_gloria_funniest_language_struggles.ts": "Modern Family Gloria English struggles funniest moments",
    "lesson_the_office_jim_pranks_on_dwight_15min.ts": "The Office Jim pranks Dwight compilation",
    "lesson_the_office_michael_scott_conference_meetings.ts": "The Office Michael Scott conference room meeting scene",
    "lesson_how_i_met_your_mother_barney_playbook_theories.ts": "How I Met Your Mother Barney Stinson Playbook best scene",
    "lesson_brooklyn_nine_nine_jake_i_want_it_that_way.ts": "Brooklyn 99 I Want It That Way cold open scene",
    "lesson_the_big_bang_theory_sheldon_roommate_agreement.ts": "Big Bang Theory Sheldon roommate agreement scene",
    "lesson_young_sheldon_outsmarting_everyone_debates.ts": "Young Sheldon outsmarting teachers best scenes",
    "lesson_ted_lasso_be_curious_not_judgmental_darts.ts": "Ted Lasso darts scene be curious not judgmental",
    "lesson_schitts_creek_alexis_david_vocabulary_dinners.ts": "Schitt's Creek Alexis and David best scenes"
}

def search_candidates():
    candidates = {}
    for filename, query in SEARCH_QUERIES.items():
        print(f"Searching for {filename} -> '{query}'...")
        cmd = [
            "yt-dlp", "--no-update",
            f"ytsearch3:{query}",
            "--print", "%(id)s"
        ]
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
            lines = [l.strip() for l in res.stdout.splitlines() if l.strip() and len(l.strip()) == 11]
            candidates[filename] = lines
            print(f"  Found: {lines}")
        except Exception as e:
            print(f"  Error: {e}")
            candidates[filename] = []
    
    with open("scripts/found_candidates.json", "w", encoding="utf-8") as f:
        json.dump(candidates, f, indent=2)
    print("Done. Saved to scripts/found_candidates.json")

if __name__ == "__main__":
    search_candidates()
