import os

mapping = {
    'features/listening/data/lessons/movies/romance': [
        ('lesson_500_days_of_summer_expectations_vs_reality.ts', 'lesson_500_days_of_summer.ts'),
        ('lesson_about_time_extraordinary_ordinary_life.ts', 'lesson_about_time.ts'),
        ('lesson_before_sunrise_vienna_night_walk.ts', 'lesson_before_sunrise.ts'),
        ('lesson_eternal_sunshine_meet_me_in_montauk.ts', 'lesson_eternal_sunshine.ts'),
        ('lesson_flipped_the_sycamore_tree_and_basket_boys.ts', 'lesson_flipped.ts'),
        ('lesson_la_la_land_the_fools_who_dream_audition.ts', 'lesson_la_la_land.ts'),
        ('lesson_me_before_you_the_final_letter_in_paris.ts', 'lesson_me_before_you.ts'),
        ('lesson_notting_hill_im_also_just_a_girl.ts', 'lesson_notting_hill.ts'),
        ('lesson_one_day_emma_dexter_love_story.ts', 'lesson_one_day.ts'),
        ('lesson_pride_and_prejudice_rain_proposal_dawn.ts', 'lesson_pride_and_prejudice.ts'),
        ('lesson_the_notebook_it_wasnt_over_confrontation.ts', 'lesson_the_notebook.ts'),
        ('lesson_titanic_flying_first_class_dinner_extended.ts', 'lesson_titanic.ts'),
    ],
    'features/listening/data/lessons/movies/sitcoms': [
        ('lesson_brooklyn_nine_nine_jake_i_want_it_that_way.ts', 'lesson_brooklyn_nine_nine.ts'),
        ('lesson_friends_best_of_chandler_bing_sarcasm.ts', 'lesson_friends_chandler_sarcasm.ts'),
        ('lesson_friends_the_iconic_apartment_bet_trivia.ts', 'lesson_friends_apartment_bet.ts'),
        ('lesson_how_i_met_your_mother_barney_playbook_theories.ts', 'lesson_how_i_met_your_mother.ts'),
        ('lesson_modern_family_best_of_phil_dunphy_dad.ts', 'lesson_modern_family_phil_dunphy.ts'),
        ('lesson_modern_family_gloria_funniest_language_struggles.ts', 'lesson_modern_family_gloria.ts'),
        ('lesson_schitts_creek_alexis_david_vocabulary_dinners.ts', 'lesson_schitts_creek.ts'),
        ('lesson_ted_lasso_be_curious_not_judgmental_darts.ts', 'lesson_ted_lasso.ts'),
        ('lesson_the_big_bang_theory_sheldon_roommate_agreement.ts', 'lesson_the_big_bang_theory.ts'),
        ('lesson_the_office_jim_pranks_on_dwight_15min.ts', 'lesson_the_office_jim_pranks.ts'),
        ('lesson_the_office_michael_scott_conference_meetings.ts', 'lesson_the_office_michael_scott.ts'),
        ('lesson_young_sheldon_outsmarting_everyone_debates.ts', 'lesson_young_sheldon.ts'),
    ],
    'features/listening/data/lessons/movies/inspirational': [
        ('lesson_12_angry_men_juror_8_first_doubt_sequence.ts', 'lesson_12_angry_men.ts'),
        ('lesson_a_beautiful_mind_nobel_prize_speech.ts', 'lesson_a_beautiful_mind.ts'),
        ('lesson_cast_away_keep_breathing_tomorrow_sun_rises.ts', 'lesson_cast_away.ts'),
        ('lesson_dead_poets_society_carpe_diem_captain.ts', 'lesson_dead_poets_society.ts'),
        ('lesson_forrest_gump_box_of_chocolates_jennys_grave.ts', 'lesson_forrest_gump.ts'),
        ('lesson_good_will_hunting_park_bench_monologue.ts', 'lesson_good_will_hunting.ts'),
        ('lesson_pursuit_of_happyness_basketball_happiness.ts', 'lesson_pursuit_of_happyness.ts'),
        ('lesson_scent_of_a_woman_al_pacino_baird_school_defense.ts', 'lesson_scent_of_a_woman.ts'),
        ('lesson_shawshank_redemption_get_busy_living_pacific.ts', 'lesson_shawshank_redemption.ts'),
        ('lesson_the_intern_ben_whittacker_gentleman_wisdom.ts', 'lesson_the_intern.ts'),
        ('lesson_theory_of_everything_where_there_is_life_hope.ts', 'lesson_theory_of_everything.ts'),
        ('lesson_whiplash_there_are_no_two_words_harmful.ts', 'lesson_whiplash.ts'),
    ],
    'features/listening/data/lessons/movies/animation': [
        ('lesson_coco_remember_me_with_mama_coco_extended.ts', 'lesson_coco.ts'),
        ('lesson_finding_nemo_dory_just_keep_swimming.ts', 'lesson_finding_dory.ts'),
        ('lesson_inside_out_joy_sadness_anxiety_breakthrough.ts', 'lesson_inside_out.ts'),
        ('lesson_kung_fu_panda_master_oogway_wisdom_peach_tree.ts', 'lesson_kung_fu_panda.ts'),
        ('lesson_monsters_inc_goodbye_boo_emotional_cut.ts', 'lesson_monsters_inc.ts'),
        ('lesson_ratatouille_anton_ego_food_review_monologue.ts', 'lesson_ratatouille.ts'),
        ('lesson_soul_the_spark_and_ocean_parable.ts', 'lesson_soul.ts'),
        ('lesson_tangled_lantern_festival_i_see_the_light.ts', 'lesson_tangled.ts'),
        ('lesson_the_lion_king_rafiki_teaches_simba_the_past.ts', 'lesson_the_lion_king.ts'),
        ('lesson_up_carl_and_ellie_thanks_for_adventure.ts', 'lesson_up.ts'),
        ('lesson_walle_i_dont_want_to_survive_i_want_to_live.ts', 'lesson_walle.ts'),
        ('lesson_zootopia_judy_nick_carrot_pen_confession.ts', 'lesson_zootopia.ts'),
    ]
}

# Verify all old files exist
all_exist = True
for folder, pairs in mapping.items():
    for old_file, new_file in pairs:
        old_path = os.path.join(folder, old_file)
        if not os.path.exists(old_path):
            print(f"MISSING: {old_path}")
            all_exist = False

if all_exist:
    print("ALL 48 OLD FILES CONFIRMED EXIST!")
else:
    print("Some files missing!")

# Scan target files that might reference the old filenames
old_basenames = {}
for folder, pairs in mapping.items():
    for old_file, new_file in pairs:
        base_old = os.path.splitext(old_file)[0]
        base_new = os.path.splitext(new_file)[0]
        old_basenames[base_old] = base_new

references = {}
search_dirs = ['features', '__tests__']
for sd in search_dirs:
    for root, dirs, files in os.walk(sd):
        for f in files:
            if f.endswith('.ts') or f.endswith('.tsx'):
                fp = os.path.join(root, f).replace('\\', '/')
                # Don't check the lesson files themselves
                if any(fp.endswith(old) for old in mapping):
                    continue
                try:
                    with open(fp, 'r', encoding='utf-8') as file_obj:
                        c = file_obj.read()
                    for base_old in old_basenames:
                        if base_old in c:
                            references.setdefault(fp, []).append(base_old)
                except Exception as e:
                    pass

print("\nFiles with references to old filenames:")
for fp, refs in sorted(references.items()):
    print(f"{fp}: {len(refs)} references")
