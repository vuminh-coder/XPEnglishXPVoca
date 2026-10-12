import os
import re

REPLACEMENTS = {
    # ANIMATION (11)
    "features/listening/data/lessons/movies/animation/lesson_kung_fu_panda_master_oogway_wisdom_peach_tree.ts": "8KO-lPAotFc",
    "features/listening/data/lessons/movies/animation/lesson_inside_out_joy_sadness_anxiety_breakthrough.ts": "4dA3enDd9AI",
    "features/listening/data/lessons/movies/animation/lesson_soul_the_spark_and_ocean_parable.ts": "Pg7Zit2Thks",
    "features/listening/data/lessons/movies/animation/lesson_ratatouille_anton_ego_food_review_monologue.ts": "tAyQL1inris",
    "features/listening/data/lessons/movies/animation/lesson_coco_remember_me_with_mama_coco_extended.ts": "z8e2fuOJTNs",
    "features/listening/data/lessons/movies/animation/lesson_up_carl_and_ellie_thanks_for_adventure.ts": "fuZuv5zXZ_U",
    "features/listening/data/lessons/movies/animation/lesson_zootopia_judy_nick_carrot_pen_confession.ts": "lbBG1AQ4NOM",
    "features/listening/data/lessons/movies/animation/lesson_finding_nemo_dory_just_keep_swimming.ts": "rBpN752FZQM",
    "features/listening/data/lessons/movies/animation/lesson_tangled_lantern_festival_i_see_the_light.ts": "c8a3K0HIKdA",
    "features/listening/data/lessons/movies/animation/lesson_walle_i_dont_want_to_survive_i_want_to_live.ts": "gwN5Km_1X9E",
    "features/listening/data/lessons/movies/animation/lesson_monsters_inc_goodbye_boo_emotional_cut.ts": "ZHUQgrbY93U",

    # INSPIRATIONAL (9)
    "features/listening/data/lessons/movies/inspirational/lesson_dead_poets_society_carpe_diem_captain.ts": "vi0Lbjs5ECI",
    "features/listening/data/lessons/movies/inspirational/lesson_shawshank_redemption_get_busy_living_pacific.ts": "46GwJbrMghQ",
    "features/listening/data/lessons/movies/inspirational/lesson_the_intern_ben_whittacker_gentleman_wisdom.ts": "x7bmt7_svd4",
    "features/listening/data/lessons/movies/inspirational/lesson_whiplash_there_are_no_two_words_harmful.ts": "WN_IzDeBdRM",
    "features/listening/data/lessons/movies/inspirational/lesson_theory_of_everything_where_there_is_life_hope.ts": "VyHfa2-wm94",
    "features/listening/data/lessons/movies/inspirational/lesson_a_beautiful_mind_nobel_prize_speech.ts": "-8Zo-NiQFtU",
    "features/listening/data/lessons/movies/inspirational/lesson_cast_away_keep_breathing_tomorrow_sun_rises.ts": "qAoNcF5uGWg",
    "features/listening/data/lessons/movies/inspirational/lesson_scent_of_a_woman_al_pacino_baird_school_defense.ts": "p9DQSnik1mw",
    "features/listening/data/lessons/movies/inspirational/lesson_12_angry_men_juror_8_first_doubt_sequence.ts": "c0SM9hGZ8w0",

    # SITCOMS (12)
    "features/listening/data/lessons/movies/sitcoms/lesson_friends_the_iconic_apartment_bet_trivia.ts": "v1xXlxDHWPU",
    "features/listening/data/lessons/movies/sitcoms/lesson_friends_best_of_chandler_bing_sarcasm.ts": "xT5zt93BbAg",
    "features/listening/data/lessons/movies/sitcoms/lesson_modern_family_best_of_phil_dunphy_dad.ts": "qMNsPjt7L4M",
    "features/listening/data/lessons/movies/sitcoms/lesson_modern_family_gloria_funniest_language_struggles.ts": "72okAeSn5Tc",
    "features/listening/data/lessons/movies/sitcoms/lesson_the_office_jim_pranks_on_dwight_15min.ts": "Xnk4seEHmgw",
    "features/listening/data/lessons/movies/sitcoms/lesson_the_office_michael_scott_conference_meetings.ts": "Db1NdYbQhAA",
    "features/listening/data/lessons/movies/sitcoms/lesson_how_i_met_your_mother_barney_playbook_theories.ts": "PTHactMyRh8",
    "features/listening/data/lessons/movies/sitcoms/lesson_brooklyn_nine_nine_jake_i_want_it_that_way.ts": "HlBYdiXdUa8",
    "features/listening/data/lessons/movies/sitcoms/lesson_the_big_bang_theory_sheldon_roommate_agreement.ts": "XIm6_2NzIc4",
    "features/listening/data/lessons/movies/sitcoms/lesson_young_sheldon_outsmarting_everyone_debates.ts": "EKEEalhsDOA",
    "features/listening/data/lessons/movies/sitcoms/lesson_ted_lasso_be_curious_not_judgmental_darts.ts": "CDRXv80F3Us",
    "features/listening/data/lessons/movies/sitcoms/lesson_schitts_creek_alexis_david_vocabulary_dinners.ts": "S_acAHyAKuI",
}

def apply_replacements():
    count = 0
    for file_rel, new_id in REPLACEMENTS.items():
        file_path = os.path.normpath(file_rel)
        if not os.path.exists(file_path):
            print(f"[MISSING] {file_path}")
            continue
        
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Replace externalId: "..."
        old_pattern = r'externalId:\s*["\']([a-zA-Z0-9_-]{11})["\']'
        m = re.search(old_pattern, content)
        if m:
            old_id = m.group(1)
            new_content = re.sub(old_pattern, f'externalId: "{new_id}"', content)
            
            # Also update any youtube.com/watch?v=old_id in header comments if present
            new_content = new_content.replace(f"watch?v={old_id}", f"watch?v={new_id}")
            
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            
            print(f"[UPDATED] {file_rel}: {old_id} -> {new_id}")
            count += 1
        else:
            print(f"[NO_MATCH] {file_rel}")

    print(f"\nTotal files updated: {count} / {len(REPLACEMENTS)}")

if __name__ == "__main__":
    apply_replacements()
