import React from "react";
import {
  Clock,
  Activity,
  History,
  Timer,
  Sparkles,
  Plane,
  Boxes,
  Scale,
  Users,
  UserCheck,
  KeyRound,
  Paperclip,
  Hash,
  BarChart2,
  FileText,
  Wand2,
  SlidersHorizontal,
  Trophy,
  Calendar,
  MapPin,
  CheckCircle2,
  RotateCw,
  Rewind,
  Hourglass,
  FastForward,
  Compass,
  RefreshCw,
  Layers,
  GitFork,
  GitBranch,
  Link2,
  Target,
  FlaskConical,
  Scissors,
  Combine,
  Minimize2,
  Copy,
  Zap,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Equal,
  CheckCheck,
  Binary,
  Pin,
  Rocket,
  BookOpen,
} from "lucide-react";

export function getGrammarTopicIcon(topicId: string) {
  switch (topicId) {
    case "present_simple":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "present_continuous":
      return <Activity className="w-4 h-4 text-emerald-500" />;
    case "past_simple":
      return <History className="w-4 h-4 text-amber-500" />;
    case "past_continuous":
      return <Timer className="w-4 h-4 text-rose-500" />;
    case "future_simple":
      return <Sparkles className="w-4 h-4 text-purple-500" />;
    case "future_near":
      return <Plane className="w-4 h-4 text-teal-500" />;
    case "singular_plural_nouns":
      return <Boxes className="w-4 h-4 text-indigo-500" />;
    case "nouns_countability":
      return <Scale className="w-4 h-4 text-[#0059bb]" />;
    case "subject_object_pronouns":
      return <Users className="w-4 h-4 text-sky-500" />;
    case "reflexive_demonstrative":
      return <UserCheck className="w-4 h-4 text-emerald-600" />;
    case "possessive_adj_pronouns":
      return <KeyRound className="w-4 h-4 text-amber-600" />;
    case "possessive_case":
      return <Paperclip className="w-4 h-4 text-slate-500" />;
    case "determiners_basic":
      return <Hash className="w-4 h-4 text-purple-600" />;
    case "quantifiers_basic":
      return <BarChart2 className="w-4 h-4 text-rose-500" />;
    case "basic_articles":
      return <FileText className="w-4 h-4 text-blue-600" />;
    case "basic_adj_adv":
      return <Wand2 className="w-4 h-4 text-violet-500" />;
    case "comparatives_basic":
      return <SlidersHorizontal className="w-4 h-4 text-sky-500" />;
    case "superlatives_basic":
      return <Trophy className="w-4 h-4 text-amber-500" />;
    case "time_prepositions":
      return <Calendar className="w-4 h-4 text-rose-500" />;
    case "place_prepositions":
      return <MapPin className="w-4 h-4 text-red-500" />;

    case "perfect_present":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "perfect_present_cont":
      return <RotateCw className="w-4 h-4 text-teal-500" />;
    case "perfect_past":
      return <Rewind className="w-4 h-4 text-amber-600" />;
    case "perfect_past_cont":
      return <Hourglass className="w-4 h-4 text-orange-500" />;
    case "perfect_future":
      return <FastForward className="w-4 h-4 text-indigo-500" />;
    case "perfect_future_cont":
      return <Compass className="w-4 h-4 text-sky-500" />;
    case "passive_basic":
      return <RefreshCw className="w-4 h-4 text-blue-600" />;
    case "passive_modals_cont":
      return <Layers className="w-4 h-4 text-purple-500" />;
    case "conditionals_0_1":
      return <GitFork className="w-4 h-4 text-emerald-600" />;
    case "conditionals_2":
      return <GitBranch className="w-4 h-4 text-teal-600" />;
    case "relative_defining":
      return <Link2 className="w-4 h-4 text-blue-500" />;
    case "relative_non_defining":
      return <Link2 className="w-4 h-4 text-[#0059bb]" />;
    case "gerunds_usage":
      return <Target className="w-4 h-4 text-rose-500" />;
    case "infinitives_usage":
      return <Target className="w-4 h-4 text-amber-500" />;
    case "modal_obligation":
      return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    case "modal_ability":
      return <Sparkles className="w-4 h-4 text-sky-500" />;
    case "conjunctions_coordinating":
      return <Link2 className="w-4 h-4 text-purple-500" />;
    case "conjunctions_cause_effect":
      return <FileText className="w-4 h-4 text-blue-500" />;
    case "reported_statements":
      return <FileText className="w-4 h-4 text-teal-500" />;
    case "reported_questions":
      return <FileText className="w-4 h-4 text-indigo-500" />;

    case "noun_clauses_basic":
      return <FileText className="w-4 h-4 text-sky-500" />;
    case "noun_clauses_advanced":
      return <FlaskConical className="w-4 h-4 text-blue-600" />;
    case "conditionals_3":
      return <GitBranch className="w-4 h-4 text-purple-600" />;
    case "conditionals_mixed":
      return <GitFork className="w-4 h-4 text-rose-500" />;
    case "conditional_inversion":
      return <RotateCw className="w-4 h-4 text-amber-500" />;
    case "inversion":
      return <RotateCw className="w-4 h-4 text-red-500" />;
    case "subjunctive_mood":
      return <Scale className="w-4 h-4 text-indigo-500" />;
    case "reduced_relative":
      return <Scissors className="w-4 h-4 text-pink-500" />;
    case "participle_clauses":
      return <Combine className="w-4 h-4 text-indigo-500" />;
    case "reduced_adverbial":
      return <Minimize2 className="w-4 h-4 text-teal-500" />;
    case "double_passive":
      return <Copy className="w-4 h-4 text-purple-500" />;
    case "cleft_sentences":
      return <Zap className="w-4 h-4 text-amber-500" />;
    case "double_comparatives":
      return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    case "advanced_comparatives":
      return <BarChart3 className="w-4 h-4 text-indigo-600" />;
    case "advanced_modals":
      return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    case "parallel_structure":
      return <Equal className="w-4 h-4 text-blue-500" />;
    case "subject_verb_exceptions":
      return <CheckCheck className="w-4 h-4 text-emerald-500" />;
    case "advanced_determiners":
      return <Binary className="w-4 h-4 text-purple-500" />;
    case "prepositional_phrases":
      return <Pin className="w-4 h-4 text-red-500" />;
    case "emphatic_fronting":
      return <Rocket className="w-4 h-4 text-rose-500" />;

    default:
      return <BookOpen className="w-4 h-4 text-[#0059bb]" />;
  }
}
