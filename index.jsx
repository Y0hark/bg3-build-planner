import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Sword, Sun, Hand, Music, Shield, Zap, Skull, Crown, ChevronRight, Info, Award, MessageSquare, Loader, Sparkles, Send, Gem, X, Activity, Shirt, Footprints, Component, Eye, MapPin, ShoppingBag, Scroll, Link, Target } from 'lucide-react';

const characters = [
    {
        id: 'fighter',
        name: "The Battle Master",
        classSplit: "Fighter 12",
        icon: <Sword className="w-6 h-6" />,
        color: "text-red-400",
        glow: "shadow-red-500/50",
        border: "border-red-500/50",
        bg: "bg-red-950/30",
        accent: "from-red-600 to-red-900",
        role: "Dégâts massifs, Tank physique, Contrôle",
        status: "Le pilier stable de l'équipe.",
        progression: [
            { level: 1, text: "Fighting Style: Great Weapon Fighting (Relance les 1 et 2 aux dégâts)." },
            { level: 3, text: "Battle Master. Manœuvres : Precision Attack (Vital), Trip Attack, Menacing Attack." },
            { level: 4, text: "Feat: Great Weapon Master (GWM). Le cœur du build." },
            { level: 6, text: "Feat: Ability Improvement (+2 Force)." },
            { level: 8, text: "Feat: Alert (Vital en Honour Mode)." },
            { level: 12, text: "Feat: Savage Attacker (Meilleur que +2 Force si déjà à 20+)." }
        ],
        gear: [
            {
                act: "Acte 1",
                slots: {
                    head: { name: "Haste Helm", loc: "Village Dévasté", source: "Coffre (Chariot)", type: "Loot", desc: "Élan au début du combat (+1.5m vitesse)." },
                    cloak: { name: "Cape", loc: "Random", source: "Loot", type: "Loot", desc: "Cape standard." },
                    body: { name: "Adamantine Splint Armour", loc: "Grymforge", source: "Forge", type: "Craft", desc: "-2 Dégâts reçus. Immunité Critiques. Chancelant." },
                    hands: { name: "Gloves of the Growling Underdog", loc: "Camp Gobelin", source: "Dror Ragzlin", type: "Loot", desc: "Avantage si entouré par 2+ ennemis." },
                    feet: { name: "Disintegrating Night Walkers", loc: "Grymforge", source: "Nere", type: "Boss", desc: "Immunité glissade/toile. Misty Step gratuit." },
                    amulet: { name: "Broodmother's Revenge", loc: "Bosquet", source: "Kagha", type: "Loot", desc: "Arme empoisonnée (+1d6) quand soigné." },
                    ring1: { name: "Caustic Band", loc: "Underdark", source: "Derryth", type: "Marchand", desc: "+2 Acide sur attaques d'arme." },
                    ring2: { name: "Crusher's Ring", loc: "Camp Gobelin", source: "Crusher", type: "Loot", desc: "+3m de mouvement." },
                    meleeMain: { name: "Unseen Menace", loc: "Crèche Y'llek", source: "Marchand", type: "Marchand", desc: "Pique (2H). Invisible (Avantage permanent). Critique 19-20." },
                    meleeOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "Utilise l'arme principale à deux mains." },
                    rangedMain: { name: "Heavy Crossbow +1", loc: "Marchands", source: "Dammon/Roah", type: "Marchand", desc: "Dégâts solides à distance." },
                    rangedOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Flawed Helldusk Helmet", loc: "Last Light", source: "Dammon", type: "Craft", desc: "+2 JS Constitution. +1 AC vs Sorts." },
                    cloak: { name: "Cloak of Elemental Absorption", loc: "Moonrise", source: "Coffre (Ketheric)", type: "Loot", desc: "Absorbe dégâts élémentaires -> Dégâts sur prochaine attaque." },
                    body: { name: "Dwarven Splintmail", loc: "Moonrise", source: "Lann Tarv", type: "Marchand", desc: "AC 19. +2 CON. -1 Dégâts reçus." },
                    hands: { name: "Flawed Helldusk Gloves", loc: "Last Light", source: "Dammon", type: "Craft", desc: "+1d4 Feu sur attaques. +1 JS Force." },
                    feet: { name: "Evasive Shoes", loc: "Last Light", source: "Mattis", type: "Marchand", desc: "+1 AC. +1 Acrobatie." },
                    amulet: { name: "Surgeon's Subjugation Amulet", loc: "Maison Guérison", source: "Malus Thorm", type: "Boss", desc: "Paralysie sur critique (1x par Long Repos)." },
                    ring1: { name: "Risky Ring", loc: "Moonrise", source: "Araj", type: "Marchand", desc: "Avantage permanent (Attaques). Désavantage JS." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet", source: "Mol", type: "Quête", desc: "+1 AC / +1 JS." },
                    meleeMain: { name: "Halberd of Vigilance", loc: "Moonrise", source: "Lann Tarv", type: "Marchand", desc: "Hallebarde (2H). +1d4 Force. +1 Initiative. Réaction Avantage." },
                    meleeOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "-" },
                    rangedMain: { name: "Heavy Crossbow +1", loc: "Act 1", source: "Loot", "type": "Core", desc: "Pas d'alternative majeure dispo." },
                    rangedOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Sarevok's Horned Helmet", loc: "Temple Bhaal", source: "Sarevok", type: "Boss", desc: "Réduit le seuil de critique de 1. Immunité Effroi." },
                    cloak: { name: "Cloak of Displacement", loc: "Wyrm's Rock", source: "Danthelon", type: "Marchand", desc: "Désavantage aux attaquants (Blur permanent)." },
                    body: { name: "Helldusk Armour", loc: "House of Hope", source: "Raphael", type: "Boss", desc: "AC 21. Vol. Maîtrise automatique." },
                    hands: { name: "Gauntlets of Hill Giant Strength", loc: "House of Hope", source: "Archives", type: "Loot", desc: "Fixe la Force à 23." },
                    feet: { name: "Boots of Persistence", loc: "Lower City", source: "Dammon", type: "Marchand", desc: "Liberté de mvt. +1 JS DEX. Résistance." },
                    amulet: { name: "Amulet of Greater Health", loc: "House of Hope", source: "Archives", type: "Loot", desc: "Fixe la Constitution à 23." },
                    ring1: { name: "Ring of Regeneration", loc: "Sorcerous Sundries", source: "Rolan", type: "Marchand", desc: "Regen PV (Active Broodmother/On-Heal)." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet", source: "Mol", type: "Quête", desc: "+1 AC / +1 JS." },
                    meleeMain: { name: "Balduran's Giantslayer", loc: "Wyrmway", source: "Ansur", type: "Boss", desc: "Double Mod Force aux dégâts. Forme de Géant." },
                    meleeOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "-" },
                    rangedMain: { name: "Gontr Mael", loc: "Foundry", source: "Titan", type: "Boss", desc: "Légendaire. Haste Céleste (5 tours, pas de léthargie)." },
                    rangedOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            }
        ]
    },
    {
        id: 'cleric',
        name: "The Radiant Turret",
        classSplit: "Cleric 10 / Druid 2",
        icon: <Sun className="w-6 h-6" />,
        color: "text-amber-300",
        glow: "shadow-amber-400/50",
        border: "border-amber-400/50",
        bg: "bg-amber-950/30",
        accent: "from-amber-500 to-yellow-700",
        role: "Gatling Eldritch Blast, Orbes & Réverbération",
        status: "Intouchable sous forme Dragon.",
        progression: [
            { level: "1-3", text: "Commencez Clerc (Lumière/Tempête). Sorts : Bless, Healing Word." },
            { level: 4, text: "Feat : Spell Sniper -> Eldritch Blast (Crit 19-20)." },
            { level: 5, text: "Clerc 5 : Spirit Guardians." },
            { level: 6, text: "Multiclass Druide 1 (Shillelagh, Thorn Whip)." },
            { level: 7, text: "Druide 2 (Cercle des Étoiles). Forme Dragon (Concentration infaillible)." },
            { level: "8-12", text: "Clerc jusqu'au bout. Feat: Alert." }
        ],
        gear: [
            {
                act: "Acte 1",
                slots: {
                    head: { name: "Holy Lance Helm", loc: "Monastère", source: "Coffre peint", type: "Loot", desc: "Ennemis qui ratent prennent 1d4 Radiant (Proc Orbes)." },
                    cloak: { name: "Cape", loc: "Random", source: "Loot", type: "Loot", desc: "N'importe quelle cape." },
                    body: { name: "Luminous Armour", loc: "Underdark", source: "Poste Séluné", type: "Loot", desc: "Dégâts Radiants = Onde de choc (Orbe Radiant)." },
                    hands: { name: "Gloves of Belligerent Skies", loc: "Crèche", source: "Inquisiteur", type: "Loot", desc: "Tonnerre/Radiant/Éclair = Réverbération." },
                    feet: { name: "Boots of Stormy Clamour", loc: "Underdark", source: "Omeluum", type: "Marchand", desc: "Appliquer Condition = Réverbération." },
                    amulet: { name: "Pearl of Power Amulet", loc: "Colonie Myconide", source: "Omeluum", type: "Marchand", desc: "Restaure un emplacement de sort (Niv 3)." },
                    ring1: { name: "The Whispering Promise", loc: "Camp Gobelin", source: "Volo/Grat", type: "Marchand", desc: "Soin = Béni (+1d4 Toucher/JS)." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet", source: "Mol", type: "Quête", desc: "+1 AC / +1 JS." },
                    meleeMain: { name: "Phalar Aluve", loc: "Underdark", source: "Rocher", type: "Loot", desc: "Mélodie : Hurlement (-1d4 aux JS ennemis)." },
                    meleeOff: { name: "Adamantine Shield", loc: "Grymforge", source: "Forge", type: "Craft", desc: "Immunité Critiques. Chancelant." },
                    rangedMain: { name: "Bow of Awareness", loc: "Camp Gobelin", source: "Roah", type: "Marchand", desc: "+1 Initiative." },
                    rangedOff: { name: "-", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Holy Lance Helm", loc: "Act 1", source: "Loot", type: "Core", desc: "BiS pour ce build." },
                    cloak: { name: "Thunderskin Cloak", loc: "Moonrise", source: "Araj", type: "Marchand", desc: "Dégâts sur cible avec Réverb = Hébété (Dazed)." },
                    body: { name: "Luminous Armour", loc: "Act 1", source: "Loot", type: "Core", desc: "Indispensable." },
                    hands: { name: "Gloves of Belligerent Skies", loc: "Act 1", source: "Loot", type: "Core", desc: "Moteur à Réverbération." },
                    feet: { name: "Boots of Stormy Clamour", loc: "Act 1", source: "Loot", type: "Core", desc: "Stack Réverbération." },
                    amulet: { name: "Spineshudder Amulet", loc: "Moonrise", source: "Mimic (Ketheric)", type: "Loot", desc: "Attaque sort distance (Eldritch Blast) = Réverbération." },
                    ring1: { name: "Coruscation Ring", loc: "Last Light", source: "Cave", type: "Loot", desc: "Dégâts sorts = Orbe Radiant x2." },
                    ring2: { name: "Ring of Spiteful Thunder", loc: "Moonrise", source: "Roah", type: "Marchand", desc: "Dégâts Tonnerre sur Réverb = Hébété." },
                    meleeMain: { name: "Blood of Lathander", loc: "Monastère", source: "Quête", type: "Leg.", desc: "Aveuglement zone. Rayon Soleil." },
                    meleeOff: { name: "Ketheric's Shield", loc: "Moonrise", source: "Ketheric", type: "Boss", desc: "+1 DD Sorts." },
                    rangedMain: { name: "Darkfire Shortbow", loc: "Last Light", source: "Dammon", type: "Marchand", desc: "Haste gratuit. Résistance Feu/Froid." },
                    rangedOff: { name: "-", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Holy Lance Helm", loc: "Act 1", source: "Loot", type: "Core", desc: "Toujours BiS." },
                    cloak: { name: "Thunderskin Cloak", loc: "Act 2", source: "Loot", type: "Core", desc: "Contrôle passif." },
                    body: { name: "Luminous Armour", loc: "Act 1", source: "Loot", type: "Core", desc: "Toujours BiS." },
                    hands: { name: "Gloves of Belligerent Skies", loc: "Act 1", source: "Loot", type: "Core", desc: "-" },
                    feet: { name: "Helldusk Boots", loc: "Wyrm's Rock", source: "Gortash", type: "Boss", desc: "Immunité mvt forcé. TP. (Ou garder Stormy Clamour)." },
                    amulet: { name: "Amulet of the Devout", loc: "Tabernacle", source: "Sous-sol", type: "Loot", desc: "+2 DD Sorts. Canalisation extra." },
                    ring1: { name: "Coruscation Ring", loc: "Act 2", source: "Loot", type: "Core", desc: "Debuff nucléaire." },
                    ring2: { name: "Ring of Spiteful Thunder", loc: "Act 2", "source": "Loot", type: "Core", desc: "Stun/Daze." },
                    meleeMain: { name: "Devotee's Mace", loc: "Intervention Divine", source: "Niv 10", type: "Classe", desc: "Aura d'Encens (Soin 1d4 passif/tour)." },
                    meleeOff: { name: "Viconia's Walking Fortress", loc: "House of Grief", source: "Viconia", type: "Boss", desc: "AC +3. Renvoi sorts. Avantage JS." },
                    rangedMain: { name: "Darkfire Shortbow", loc: "Act 2", source: "Loot", type: "Core", desc: "Haste." },
                    rangedOff: { name: "-", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            }
        ]
    },
    {
        id: 'monk',
        name: "The One-Punch Monk",
        classSplit: "Monk 8 / Rogue 4",
        icon: <Hand className="w-6 h-6" />,
        color: "text-cyan-400",
        glow: "shadow-cyan-500/50",
        border: "border-cyan-500/50",
        bg: "bg-cyan-950/30",
        accent: "from-cyan-600 to-blue-800",
        role: "Dégâts monocibles absurdes, Stun",
        status: "Tavern Brawler + Élixirs Force.",
        progression: [
            { level: "Note", text: "BUVEZ des Élixirs de Force de Géant ! (Morning Routine)." },
            { level: "1-6", text: "Monk (Open Hand). Niv 4 Feat: Tavern Brawler (+1 CON)." },
            { level: "7-9", text: "Rogue (Thief). Niv 3: Fast Hands (2 Actions Bonus)." },
            { level: 10, text: "Rogue 4: Feat Alert ou +2 Sagesse." },
            { level: "11-12", text: "Monk 7-8. Evasion, Stillness of Mind." }
        ],
        gear: [
            {
                act: "Acte 1",
                slots: {
                    head: { name: "Haste Helm", loc: "Village Dévasté", source: "Coffre", type: "Loot", desc: "Élan au début du combat." },
                    cloak: { name: "Cape", loc: "Random", source: "Loot", type: "Loot", desc: "Cape standard." },
                    body: { name: "The Graceful Cloth", loc: "Monastère (Route)", source: "Esther", type: "Marchand", desc: "+2 DEX. Avantage DEX. Saut amélioré." },
                    hands: { name: "The Sparkle Hands", loc: "Putrid Bog", source: "Coffre (Arbre)", type: "Loot", desc: "Charges de Foudre sur attaques mains nues." },
                    feet: { name: "Boots of Speed", loc: "Colonie Myconide", source: "Thulla", type: "Quête", desc: "Action Bonus : Dash (Double vitesse)." },
                    amulet: { name: "Sentient Amulet", loc: "Grymforge", source: "Lave", type: "Quête", desc: "Restoration Ki (Action Bonus)." },
                    ring1: { name: "Crusher's Ring", loc: "Camp Gobelin", source: "Crusher", type: "Loot", desc: "+3m Mouvement." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet", source: "Mol", type: "Quête", desc: "+1 AC / +1 JS." },
                    meleeMain: { name: "Mains Nues", loc: "-", source: "Inné", type: "Classe", desc: "Buvez des Élixirs de Force !" },
                    meleeOff: { name: "Mains Nues", loc: "-", source: "-", type: "Classe", desc: "-" },
                    rangedMain: { name: "Hunting Shortbow", loc: "Bosquet", source: "Dammon", type: "Marchand", desc: "Stat stick: Avantage contre Monstruosités." },
                    rangedOff: { name: "-", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Hat of Uninhibited Kushigo", loc: "Last Light", source: "Talli", type: "Marchand", desc: "+1 DD Sorts quand frappe mains nues." },
                    cloak: { name: "Cloak of Protection", loc: "Last Light", source: "Talli", type: "Marchand", desc: "+1 AC / +1 JS." },
                    body: { name: "The Graceful Cloth", loc: "Act 1", source: "Loot", type: "Core", desc: "Toujours BiS pour les dégâts." },
                    hands: { name: "Gloves of Crushing", loc: "Moonrise", source: "Lann Tarv", type: "Marchand", desc: "+1 Toucher, +2 Dégâts (Mains nues)." },
                    feet: { name: "Boots of Uninhibited Kushigo", loc: "Plan Astral", source: "Gith Monk", type: "Loot", desc: "Ajoute mod. Sagesse aux dégâts." },
                    amulet: { name: "Sentient Amulet", loc: "Act 1", source: "Quest", type: "Core", desc: "Ki gratuit." },
                    ring1: { name: "Shadow-Cloaked Ring", loc: "Maison Guérison", source: "Ombres", type: "Loot", desc: "+1d4 dégâts si dans l'ombre." },
                    ring2: { name: "Risky Ring", loc: "Moonrise", source: "Araj", type: "Marchand", desc: "Avantage permanent (Stunning Strike passe)." },
                    meleeMain: { name: "Mains Nues", loc: "-", source: "-", type: "Classe", desc: "Élixirs requis." },
                    meleeOff: { name: "Mains Nues", loc: "-", source: "-", type: "Classe", desc: "-" },
                    rangedMain: { name: "Ne'er Misser", loc: "Moonrise", source: "Roah", "type": "Marchand", desc: "Stat stick: Dégâts de force. Sort Magic Missile." },
                    rangedOff: { name: "-", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Mask of Soul Perception", loc: "Devil's Fee", source: "Helsik", type: "Loot", desc: "+2 Toucher. +2 Initiative." },
                    cloak: { name: "Cloak of Displacement", loc: "Wyrm's Rock", source: "Danthelon", type: "Marchand", desc: "Désavantage aux attaquants." },
                    body: { name: "Vest of Soul Rejuvenation", loc: "Sorcerous Sundries", source: "Lorroakan", "type": "Marchand", desc: "+2 AC. Réaction attaque gratuite si on vous rate." },
                    hands: { name: "Gloves of Soul Catching", loc: "House of Hope", source: "Hope", type: "Quête", desc: "+1d10 Force. Soin/Avantage. +2 CON." },
                    feet: { name: "Boots of Uninhibited Kushigo", loc: "Act 2", source: "Loot", type: "Core", desc: "Sagesse aux dégâts." },
                    amulet: { name: "Khalid's Gift", loc: "Maison Jaheira", source: "Coffre", type: "Loot", desc: "+1 Sagesse (Max 21). Aide le scaling bottes." },
                    ring1: { name: "Ring of Free Action", loc: "Moonrise", source: "Araj", type: "Marchand", desc: "Ignore terrains difficiles. Anti-Paralysie." },
                    ring2: { name: "Killer's Sweetheart", loc: "Gauntlet Shar", source: "Loot", type: "Loot", desc: "Critique garanti." },
                    meleeMain: { name: "Mains Nues", loc: "-", source: "-", type: "Classe", desc: "Dégâts ~40-60 par coup." },
                    meleeOff: { name: "Mains Nues", loc: "-", source: "-", type: "Classe", desc: "Les gants donnent Force 20+." },
                    rangedMain: { name: "Hellrider Longbow", loc: "Rivington", source: "Ferguson", type: "Marchand", desc: "Stat stick: +3 Initiative. Avantage Perception." },
                    rangedOff: { name: "-", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            }
        ]
    },
    {
        id: 'bard',
        name: "The Control Bard",
        classSplit: "Bard 10 / Fighter 2",
        icon: <Music className="w-6 h-6" />,
        color: "text-fuchsia-400",
        glow: "shadow-fuchsia-500/50",
        border: "border-fuchsia-500/50",
        bg: "bg-fuchsia-950/30",
        accent: "from-fuchsia-600 to-purple-800",
        role: "Contrôle de masse + Burst (Slashing Flourish)",
        status: "God Mode avec Arcane Acuity.",
        progression: [
            { level: 1, text: "Fighter 1 (CON Saves, Archery Style)." },
            { level: "2-7", text: "Bard 6 (Swords). Slashing Flourish (Double attaque)." },
            { level: 5, text: "Feat: Sharpshooter." },
            { level: 8, text: "Fighter 2 (Action Surge)." },
            { level: "9-12", text: "Bard -> 10. Magical Secrets (Counterspell, Command)." }
        ],
        gear: [
            {
                act: "Acte 1",
                slots: {
                    head: { name: "Diadem of Arcane Synergy", loc: "Crèche Y'llek", source: "Jhe'rezath", type: "Loot", desc: "Ajoute Mod (CHA) aux dégâts d'arme si condition infligée." },
                    cloak: { name: "Cape", loc: "Random", source: "Loot", type: "Loot", desc: "Cape standard." },
                    body: { name: "Spidersilk Armour", loc: "Sanctum", source: "Minthara", type: "Boss", desc: "Avantage JS Constitution (Concentration)." },
                    hands: { name: "Gloves of Dexterity", loc: "Crèche Y'llek", source: "Jeera", type: "Marchand", desc: "Fixe DEX à 18. +1 Attaque." },
                    feet: { name: "Boots of Striding", loc: "Sanctum", source: "Minthara", type: "Boss", desc: "Immunité Renversement si concentré." },
                    amulet: { name: "Amulet of Branding", loc: "Crèche Y'llek", source: "Jeera", type: "Marchand", desc: "Marque une cible (Vulnérabilité dégâts Physiques)." },
                    ring1: { name: "Caustic Band", loc: "Underdark", source: "Derryth", type: "Marchand", desc: "+2 Acide sur attaques." },
                    ring2: { name: "Strange Conduit Ring", loc: "Crèche Y'llek", source: "Inquisiteur", type: "Loot", desc: "+1d4 Psychique si concentré." },
                    meleeMain: { name: "Phalar Aluve", loc: "Underdark", source: "Rocher", type: "Loot", desc: "Buff de zone (Toucher/Dégâts)." },
                    meleeOff: { name: "Club of Hill Giant Strength", loc: "Tour Arcanique", source: "Tabouret", type: "Loot", desc: "Force 19 (Boost dégâts Titanstring)." },
                    rangedMain: { name: "Titanstring Bow", loc: "Zhentarim", source: "Brem", type: "Marchand", desc: "Ajoute Mod de Force aux dégâts." },
                    rangedOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Helmet of Arcane Acuity", loc: "Reithwin", source: "Maçons", type: "Loot", desc: "BiS. Attaque arme = +DD Sorts (Max +10)." },
                    cloak: { name: "Cloak of Protection", loc: "Last Light", source: "Talli", type: "Marchand", desc: "+1 AC / +1 JS." },
                    body: { name: "Yuan-Ti Scale Mail", loc: "Last Light", source: "Talli", type: "Marchand", desc: "AC 15 + Full DEX. +1 Initiative." },
                    hands: { name: "Gloves of Dexterity", loc: "Act 1", source: "Loot", type: "Core", desc: "Permet de maxer CHA et CON." },
                    feet: { name: "Evasive Shoes", loc: "Last Light", source: "Mattis", type: "Marchand", desc: "+1 AC." },
                    amulet: { name: "Amulet of the Harpers", loc: "Last Light", source: "Talli", type: "Marchand", desc: "Sort : Bouclier (Réaction +5 AC)." },
                    ring1: { name: "Killer's Sweetheart", loc: "Gauntlet Shar", source: "Loot", type: "Loot", desc: "Critique garanti." },
                    ring2: { name: "Strange Conduit Ring", loc: "Act 1", source: "Loot", type: "Core", desc: "Dégâts constants." },
                    meleeMain: { name: "Knife of the Undermountain King", loc: "Crèche", source: "Jeera", type: "Marchand", desc: "Critique sur 19-20. Relance dégâts faibles." },
                    meleeOff: { name: "Club of Hill Giant Strength", loc: "Act 1", source: "Loot", type: "Core", desc: "Force 19 (Boost dégâts Titanstring)." },
                    rangedMain: { name: "Titanstring Bow", loc: "Act 1", source: "Loot", type: "Core", desc: "Reste BiS avec Force 19." },
                    rangedOff: { name: "(2 Mains)", loc: "-", source: "-", type: "Info", desc: "-" }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Helmet of Arcane Acuity", loc: "Act 2", source: "Loot", type: "Core", desc: "Toujours BiS." },
                    cloak: { name: "Nymph Cloak", loc: "Wyrm's Crossing", source: "Danthelon", type: "Marchand", desc: "Sort : Domination de Personne." },
                    body: { name: "Armour of Agility", loc: "Lower City", source: "Gloomy", type: "Marchand", desc: "AC 17 + Full DEX. +2 JS." },
                    hands: { name: "Legacy of the Masters", loc: "Lower City", source: "Dammon", type: "Marchand", desc: "+2 Toucher/Dégâts. +1 JS Force." },
                    feet: { name: "Helldusk Boots", loc: "Wyrm's Rock", source: "Gortash", type: "Boss", desc: "TP + Immunité mvt forcé." },
                    amulet: { name: "Spellcrux Amulet", loc: "Moonrise", source: "Warden", "type": "Loot", desc: "Restaure un slot de sort (Action Bonus)." },
                    ring1: { name: "Band of the Mystic Scoundrel", loc: "Jungle (Cirque)", source: "Akabi", "type": "Loot", "desc": "Illusion/Enchantement en Action Bonus après attaque." },
                    ring2: { name: "Ring of Regeneration", loc: "Sorcerous Sundries", source: "Rolan", "type": "Marchand", "desc": "Soin passif." },
                    meleeMain: { name: "Rhapsody", loc: "Palais Cazador", source: "Cazador", "type": "Boss", "desc": "+3 Toucher/Dégâts/DD Sorts (Stack sur kills)." },
                    meleeOff: { name: "Viconia's Walking Fortress", loc: "House of Grief", source: "Viconia", "type": "Boss", "desc": "AC +3. (Plus besoin de Force avec Dead Shot)." },
                    rangedMain: { name: "The Dead Shot", loc: "Lower City", source: "Fytz", "type": "Marchand", "desc": "Critique 19-20. Double Maîtrise au toucher. Indispensable." },
                    rangedOff: { name: "(2 Mains)", loc: "-", source: "-", "type": "Info", "desc": "-" }
                }
            }
        ]
    }
];



// --- Helper Components ---
const GearTooltip = ({ item, color }) => {
    if (!item) return null;

    return (
        <div className="absolute z-50 w-64 bottom-full left-1/2 -translate-x-1/2 mb-3 bg-slate-950/95 border border-amber-500/30 rounded-lg shadow-[0_0_30px_-5px_rgba(0,0,0,0.8)] p-3 text-left pointer-events-none animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200">
            {/* Connector Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-slate-950/95"></div>

            {/* Header */}
            <div className={`text-sm font-black uppercase tracking-wider mb-2 ${color} border-b border-white/10 pb-1`}>
                {item.name}
            </div>

            {/* Meta Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
                <span className="text-[9px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded uppercase tracking-wide font-bold flex items-center gap-1">
                    {item.type === "Loot" && <Gem className="w-2.5 h-2.5" />}
                    {item.type === "Marchand" && <ShoppingBag className="w-2.5 h-2.5" />}
                    {(item.type === "Boss" || item.type === "Quête") && <Skull className="w-2.5 h-2.5" />}
                    {item.type}
                </span>
                <span className="text-[9px] bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded uppercase tracking-wide font-bold">
                    {item.loc.includes("Acte") ? "" : "Zone :"} {item.loc}
                </span>
            </div>

            {/* Description / Effect */}
            <div className="text-xs text-slate-300 leading-relaxed font-medium">
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Effet</span>
                {item.desc}
            </div>

            {/* Source Detail */}
            <div className="mt-2 pt-2 border-t border-white/5 flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-slate-500 mt-0.5" />
                <span className="text-[10px] text-slate-400 italic">{item.source}</span>
            </div>
        </div>
    );
};

const getSlotIcon = (key) => {
    switch (key) {
        case 'head': return <Crown className="w-3 h-3" />;
        case 'body': return <Shirt className="w-3 h-3" />;
        case 'cloak': return <Eye className="w-3 h-3" />;
        case 'amulet': return <Link className="w-3 h-3" />;
        case 'hands': return <Hand className="w-3 h-3" />;
        case 'feet': return <Footprints className="w-3 h-3" />;
        case 'ring': case 'ring1': case 'ring2': return <Component className="w-3 h-3" />;
        case 'weapon': case 'meleeMain': return <Sword className="w-3 h-3" />;
        case 'shield': case 'meleeOff': return <Shield className="w-3 h-3" />;
        case 'bow': case 'rangedMain': case 'rangedOff': return <Target className="w-3 h-3" />;
        default: return <Info className="w-3 h-3" />;
    }
};

const getSlotLabel = (key) => {
    switch (key) {
        case 'head': return 'Tête';
        case 'body': return 'Corps';
        case 'cloak': return 'Manteau';
        case 'amulet': return 'Amulette';
        case 'hands': return 'Mains';
        case 'feet': return 'Bottes';
        case 'ring': case 'ring1': case 'ring2': return 'Anneau';
        case 'weapon': case 'meleeMain': return 'Arme';
        case 'shield': case 'meleeOff': return 'Bouclier';
        case 'bow': case 'rangedMain': case 'rangedOff': return 'Distance';
        default: return key;
    }
};

const places = [
    {
        id: 'act1',
        name: "Acte 1",
        zones: [
            {
                id: 'wilderness',
                name: "Surface & Wilderness",
                items: [
                    { name: "Haste Helm", loc: "Village Dévasté", source: "Coffre (Chariot)", type: "Loot", slot: "head", desc: "Élan au début du combat (+1.5m vitesse).", relatedBuilds: ['fighter', 'monk'] },
                    { name: "Broodmother's Revenge", loc: "Bosquet d'Émeraude", source: "Kagha", type: "Loot", slot: "amulet", desc: "Arme empoisonnée (+1d6) quand soigné. Fort sur Fighter.", relatedBuilds: ['fighter'] },
                    { name: "Ring of Protection", loc: "Bosquet d'Émeraude", source: "Mol (Quête Idol)", type: "Quête", slot: "ring", desc: "+1 AC / +1 JS. Universellement bon.", relatedBuilds: ['fighter', 'cleric', 'monk'] },
                    { name: "Hunting Shortbow", loc: "Bosquet d'Émeraude", source: "Dammon", type: "Marchand", slot: "bow", desc: "Avantage contre Monstruosités. Stat stick Monk.", relatedBuilds: ['monk'] },
                    { name: "The Sparkle Hands", loc: "Putrid Bog", source: "Coffre (Arbre)", type: "Loot", slot: "hands", desc: "Charges de Foudre sur attaques mains nues.", relatedBuilds: ['monk'] },
                    { name: "Titanstring Bow", loc: "Zhentarim Hideout", source: "Brem", type: "Marchand", slot: "bow", desc: "Ajoute Mod de Force aux dégâts. BiS Bard/Ranger.", relatedBuilds: ['bard'] },
                    { name: "Club of Hill Giant Strength", loc: "Tour Arcanique", source: "Tabouret (Étage Sup)", type: "Loot", slot: "weapon", desc: "Force 19. Stat stick pour Titanstring.", relatedBuilds: ['bard'] }
                ]
            },
            {
                id: 'goblin_camp',
                name: "Camp Gobelin",
                items: [
                    { name: "Gloves of the Growling Underdog", loc: "Trésor Dror Ragzlin", source: "Coffre", type: "Loot", slot: "hands", desc: "Avantage si entouré par 2+ ennemis.", relatedBuilds: ['fighter'] },
                    { name: "Crusher's Ring", loc: "Extérieur", source: "Crusher", type: "Loot", slot: "ring", desc: "+3m de mouvement. Excellent pour mêlée.", relatedBuilds: ['fighter', 'monk'] },
                    { name: "The Whispering Promise", loc: "Intérieur/Extérieur", source: "Volo / Grat", type: "Marchand", slot: "ring", desc: "Soin = Béni (+1d4 Toucher/JS). Core Support.", relatedBuilds: ['cleric'] },
                    { name: "Bow of Awareness", loc: "Intérieur", source: "Roah Moonglow", type: "Marchand", slot: "bow", desc: "+1 Initiative. Stat stick.", relatedBuilds: ['cleric'] },
                    { name: "Spidersilk Armour", loc: "Sanctum", source: "Minthara", type: "Boss", slot: "body", desc: "Avantage JS Constitution (Concentration).", relatedBuilds: ['bard'] },
                    { name: "Boots of Striding", loc: "Sanctum", source: "Minthara", type: "Boss", slot: "feet", desc: "Immunité Renversement si concentré.", relatedBuilds: ['bard'] }
                ]
            },
            {
                id: 'underdark',
                name: "Underdark & Myconid Colony",
                items: [
                    { name: "Phalar Aluve", loc: "Avant-poste Sélunite", source: "Rocher", type: "Loot", slot: "weapon", desc: "Épée longue qui chante/hurle. Vital pour Clerc/Bard.", relatedBuilds: ['cleric', 'bard'] },
                    { name: "Luminous Armour", loc: "Avant-poste Sélunite", source: "Coffre secret", type: "Loot", slot: "body", desc: "Explosion radiante. Core item pour Clerc.", relatedBuilds: ['cleric'] },
                    { name: "Caustic Band", loc: "Colonie Myconide", source: "Derryth", type: "Marchand", slot: "ring", desc: "+2 Acide aux attaques. Bon pour Fighter/Bard.", relatedBuilds: ['fighter', 'bard'] },
                    { name: "Boots of Speed", loc: "Colonie Myconide", source: "Thulla", type: "Quête", slot: "feet", desc: "Bonus Action Dash. Core pour Monk.", relatedBuilds: ['monk'] },
                    { name: "Boots of Stormy Clamour", loc: "Colonie Myconide", source: "Omeluum", type: "Marchand", slot: "feet", desc: "Réverbération sur condition. Core pour Clerc.", relatedBuilds: ['cleric'] },
                    { name: "Pearl of Power Amulet", loc: "Colonie Myconide", source: "Omeluum", type: "Marchand", slot: "amulet", desc: "Restaure un emplacement de sort (Niv 3).", relatedBuilds: ['cleric'] }
                ]
            },
            {
                id: 'grymforge',
                name: "Grymforge",
                items: [
                    { name: "Adamantine Splint Armour", loc: "Forge Ancienne", source: "Craft", type: "Craft", slot: "body", desc: "Meilleure armure lourde Acte 1. Core Fighter.", relatedBuilds: ['fighter'] },
                    { name: "Adamantine Shield", loc: "Forge Ancienne", source: "Craft", type: "Craft", slot: "shield", desc: "Immunité Crit. Debuff attaquant. Core Clerc.", relatedBuilds: ['cleric'] },
                    { name: "Disintegrating Night Walkers", loc: "Éboulement", source: "Nere", type: "Boss", slot: "feet", desc: "Misty Step gratuit. Immunité terrain.", relatedBuilds: ['fighter'] },
                    { name: "Sentient Amulet", loc: "Lave", source: "Coffre (Élémentaire)", type: "Quête", slot: "amulet", desc: "Restauration Ki. Core Monk.", relatedBuilds: ['monk'] }
                ]
            },
            {
                id: 'creche',
                name: "Monastère & Crèche Y'llek",
                items: [
                    { name: "Blood of Lathander", loc: "Monastère", source: "Quête", type: "Leg.", slot: "weapon", desc: "Aveuglement zone. Rayon Soleil. Arme légendaire.", relatedBuilds: ['cleric'] },
                    { name: "The Graceful Cloth", loc: "Route du Monastère", source: "Lady Esther", type: "Marchand", slot: "body", desc: "+2 DEX. Avantage DEX. Core Dégâts Monk.", relatedBuilds: ['monk'] },
                    { name: "Gloves of Dexterity", loc: "Aha y'llek", source: "Jeera", type: "Marchand", slot: "hands", desc: "DEX 18. Vital pour le Bard (dump stats).", relatedBuilds: ['bard'] },
                    { name: "Knife of the Undermountain King", loc: "Aha y'llek", source: "Jeera", type: "Marchand", slot: "weapon", desc: "Critique amélioré. Off-hand pour Bard.", relatedBuilds: ['bard'] },
                    { name: "Unseen Menace", loc: "Aha y'llek", source: "Jeera", type: "Marchand", slot: "weapon", desc: "Pique invisible. Avantage permanent. Core Fighter.", relatedBuilds: ['fighter'] },
                    { name: "Diadem of Arcane Synergy", loc: "Inquisiteur", source: "Jhe'rezath", type: "Loot", slot: "head", desc: "Ajoute Mod (Stat) aux dégâts. Fort sur Bard/Paladin.", relatedBuilds: ['bard'] },
                    { name: "Gloves of Belligerent Skies", loc: "Inquisiteur", source: "Coffre", type: "Loot", slot: "hands", desc: "Réverbération sur Tonnerre/Radiant. Core Clerc.", relatedBuilds: ['cleric'] },
                    { name: "Holy Lance Helm", loc: "Monastère", source: "Coffre (Toit)", type: "Loot", slot: "head", desc: "Ennemis qui ratent prennent 1d4 Radiant. Core Clerc.", relatedBuilds: ['cleric'] },
                    { name: "Strange Conduit Ring", loc: "Inquisiteur", source: "Coffre", type: "Loot", slot: "ring", desc: "+1d4 Psychique si concentré.", relatedBuilds: ['bard'] },
                    { name: "Amulet of Branding", loc: "Aha y'llek", source: "Jeera", type: "Marchand", slot: "amulet", desc: "Vulnérabilité dégâts Physiques (1x).", relatedBuilds: ['bard'] }
                ]
            }
        ]
    },
    {
        id: 'act2',
        name: "Acte 2",
        zones: [
            {
                id: 'last_light',
                name: "Auberge de l'Ultime Lueur",
                items: [
                    { name: "Flawed Helldusk Helmet", loc: "Forge", source: "Dammon", type: "Craft", slot: "head", desc: "+2 JS Constitution. +1 AC vs Sorts.", relatedBuilds: ['fighter'] },
                    { name: "Flawed Helldusk Gloves", loc: "Forge", source: "Dammon", type: "Craft", slot: "hands", desc: "+1d4 Feu sur attaques. +1 JS Force.", relatedBuilds: ['fighter'] },
                    { name: "Evasive Shoes", loc: "Extérieur", source: "Mattis", type: "Marchand", slot: "feet", desc: "+1 AC. +1 Acrobatie. Bon filler.", relatedBuilds: ['fighter', 'bard'] },
                    { name: "Coruscation Ring", loc: "Sous-sol", source: "Coffre", type: "Loot", slot: "ring", desc: "Dégâts sorts = Orbe Radiant. Core Clerc.", relatedBuilds: ['cleric'] },
                    { name: "Darkfire Shortbow", loc: "Forge", source: "Dammon", type: "Marchand", slot: "bow", desc: "Haste gratuit. Résistance Feu/Froid.", relatedBuilds: ['cleric'] },
                    { name: "Hat of Uninhibited Kushigo", loc: "Intérieur", source: "Talli", type: "Marchand", slot: "head", desc: "+1 DD Sorts quand frappe mains nues.", relatedBuilds: ['monk'] },
                    { name: "Cloak of Protection", loc: "Intérieur", source: "Talli", type: "Marchand", slot: "cloak", desc: "+1 AC / +1 JS. BiS Défensif.", relatedBuilds: ['monk', 'bard'] },
                    { name: "Yuan-Ti Scale Mail", loc: "Intérieur", source: "Talli", type: "Marchand", slot: "body", desc: "AC 15 + Full DEX. +1 Initiative. BiS Bard Acte 2.", relatedBuilds: ['bard'] },
                    { name: "Amulet of the Harpers", loc: "Intérieur", source: "Talli", type: "Marchand", slot: "amulet", desc: "Sort : Bouclier (Réaction +5 AC).", relatedBuilds: ['bard'] }
                ]
            },
            {
                id: 'moonrise',
                name: "Tours de Hautelune",
                items: [
                    { name: "Risky Ring", loc: "RDC", source: "Araj Oblodra", type: "Marchand", slot: "ring", desc: "Avantage permanent (Attaques). Désavantage JS. Game changer.", relatedBuilds: ['fighter', 'monk'] },
                    { name: "Dwarven Splintmail", loc: "RDC", source: "Lann Tarv", type: "Marchand", slot: "body", desc: "AC 19. +2 CON. -1 Dégâts reçus.", relatedBuilds: ['fighter'] },
                    { name: "Halberd of Vigilance", loc: "RDC", source: "Lann Tarv", type: "Marchand", slot: "weapon", desc: "Hallebarde (2H). +1d4 Force. +1 Initiative. Réaction Avantage.", relatedBuilds: ['fighter'] },
                    { name: "Thunderskin Cloak", loc: "RDC", source: "Araj Oblodra", type: "Marchand", slot: "cloak", desc: "Dégâts sur cible avec Réverb = Hébété (Dazed).", relatedBuilds: ['cleric'] },
                    { name: "Gloves of Crushing", loc: "RDC", source: "Lann Tarv", type: "Marchand", slot: "hands", desc: "+1 Toucher, +2 Dégâts (Mains nues). Core Monk.", relatedBuilds: ['monk'] },
                    { name: "Ne'er Misser", loc: "RDC", source: "Roah Moonglow", type: "Marchand", slot: "bow", desc: "Dégâts de force. Sort Magic Missile. Stat stick Monk.", relatedBuilds: ['monk'] },
                    { name: "Ring of Free Action", loc: "RDC", source: "Araj Oblodra", type: "Marchand", slot: "ring", desc: "Ignore terrains difficiles. Anti-Paralysie.", relatedBuilds: ['monk'] },
                    { name: "Ring of Spiteful Thunder", loc: "RDC", source: "Roah Moonglow", type: "Marchand", slot: "ring", desc: "Dégâts Tonnerre sur Réverb = Hébété.", relatedBuilds: ['cleric'] },
                    { name: "Spineshudder Amulet", loc: "Étage (Chambre Ketheric)", source: "Coffre (Mimic)", type: "Loot", slot: "amulet", desc: "Attaque sort distance = Réverbération.", relatedBuilds: ['cleric'] },
                    { name: "Cloak of Elemental Absorption", loc: "Étage (Chambre Ketheric)", source: "Coffre", type: "Loot", slot: "cloak", desc: "Absorbe dégâts élémentaires.", relatedBuilds: ['fighter'] },
                    { name: "Ketheric's Shield", loc: "Toit/Colonie", source: "Ketheric Thorm", type: "Boss", slot: "shield", desc: "+1 DD Sorts. +2 AC.", relatedBuilds: ['cleric'] },
                    { name: "Spellcrux Amulet", loc: "Prison", source: "The Warden", type: "Loot", slot: "amulet", desc: "Restaure un slot de sort (Action Bonus).", relatedBuilds: ['bard'] }
                ]
            },
            {
                id: 'reithwin',
                name: "Reithwin & Environs",
                items: [
                    { name: "Helmet of Arcane Acuity", loc: "Guilde des Maçons", source: "Sous-sol (Coffre)", type: "Loot", slot: "head", desc: "BiS Absolu. Les attaques montent le DD des sorts.", relatedBuilds: ['bard'] },
                    { name: "Surgeon's Subjugation Amulet", loc: "Maison de Guérison", source: "Malus Thorm", type: "Boss", slot: "amulet", desc: "Paralysie sur critique (1x par Long Repos).", relatedBuilds: ['fighter'] },
                    { name: "Shadow-Cloaked Ring", loc: "Maison de Guérison", source: "Ombres (Morgue)", type: "Loot", slot: "ring", desc: "+1d4 dégâts si dans l'ombre.", relatedBuilds: ['monk'] },
                    { name: "Killer's Sweetheart", loc: "Gauntlet of Shar", source: "Self-Same Trial", type: "Loot", slot: "ring", desc: "Critique garanti sur demande.", relatedBuilds: ['monk', 'bard'] },
                    { name: "Boots of Uninhibited Kushigo", loc: "Plan Astral", source: "Gith Monk (Début Acte 3)", type: "Loot", slot: "feet", desc: "Ajoute mod. Sagesse aux dégâts mains nues. Core Monk. (Tech. Acte 3 transition)", relatedBuilds: ['monk'] }
                ]
            }
        ]
    },
    {
        id: 'act3',
        name: "Acte 3",
        zones: [
            {
                id: 'rivington',
                name: "Rivington & Wyrm's Crossing",
                items: [
                    { name: "Nymph Cloak", loc: "Wyrm's Crossing", source: "Danthelon", type: "Marchand", slot: "cloak", desc: "Sort : Domination de Personne.", relatedBuilds: ['bard'] },
                    { name: "Cloak of Displacement", loc: "Wyrm's Crossing", source: "Danthelon", type: "Marchand", slot: "cloak", desc: "Désavantage aux attaquants (Blur permanent). BiS Défensif.", relatedBuilds: ['fighter', 'monk'] },
                    { name: "Hellrider Longbow", loc: "Rivington", source: "Fergus Drogher", type: "Marchand", slot: "bow", desc: "+3 Initiative. Avantage Perception.", relatedBuilds: ['monk'] },
                    { name: "Band of the Mystic Scoundrel", loc: "Cirque", source: "Akabi (Jungle)", type: "Loot", slot: "ring", desc: "Illusion/Enchantement en Action Bonus après attaque. BiS Bard.", relatedBuilds: ['bard'] },
                    { name: "Helldusk Boots", loc: "Wyrm's Rock", source: "Gortash's Chest", type: "Boss", slot: "feet", desc: "TP + Immunité mvt forcé. BiS.", relatedBuilds: ['cleric', 'bard'] }
                ]
            },
            {
                id: 'lower_city',
                name: "Ville Basse (Lower City)",
                items: [
                    { name: "Armour of Agility", loc: "Armurerie de Stormshore", source: "Gloomy Fentonson", type: "Marchand", slot: "body", desc: "AC 17 + Full DEX. +2 JS. BiS Bard.", relatedBuilds: ['bard'] },
                    { name: "Legacy of the Masters", loc: "Forge des Neuf", source: "Dammon", type: "Marchand", slot: "hands", desc: "+2 Toucher/Dégâts. +1 JS Force.", relatedBuilds: ['bard'] },
                    { name: "Boots of Persistence", loc: "Forge des Neuf", source: "Dammon", type: "Marchand", slot: "feet", desc: "Liberté de mvt. +1 JS DEX. Résistance.", relatedBuilds: ['fighter'] },
                    { name: "The Dead Shot", loc: "Armurerie de Stormshore", source: "Fytz", type: "Marchand", slot: "bow", desc: "Critique 19-20. Double Maîtrise au toucher. Indispensable.", relatedBuilds: ['bard'] },
                    { name: "Amulet of the Devout", loc: "Stormshore Tabernacle", source: "Sous-sol", type: "Loot", slot: "amulet", desc: "+2 DD Sorts. Canalisation extra. BiS Clerc.", relatedBuilds: ['cleric'] },
                    { name: "Ring of Regeneration", loc: "Sorcerous Sundries", source: "Rolan/Lorroakan", type: "Marchand", slot: "ring", desc: "Soin passif (1d4).", relatedBuilds: ['fighter', 'bard'] },
                    { name: "Vest of Soul Rejuvenation", loc: "Sorcerous Sundries", source: "Lorroakan", type: "Loot", slot: "body", desc: "+2 AC. Réaction attaque gratuite si on vous rate. BiS Monk.", relatedBuilds: ['monk'] },
                    { name: "Khalid's Gift", loc: "Maison de Jaheira", source: "Armoire", type: "Loot", slot: "amulet", desc: "+1 Sagesse (Max 21). Aide le scaling Monk.", relatedBuilds: ['monk'] },
                    { name: "Mask of Soul Perception", loc: "Devil's Fee", source: "Helsik", type: "Loot", slot: "head", desc: "+2 Toucher. +2 Initiative.", relatedBuilds: ['monk'] },
                    { name: "Rhapsody", loc: "Palais de Cazador", source: "Cazador", type: "Boss", slot: "weapon", desc: "+3 Toucher/Dégâts/DD Sorts (Stack sur kills).", relatedBuilds: ['bard'] }
                ]
            },
            {
                id: 'boss_areas',
                name: "Zones de Boss & Endgame",
                items: [
                    { name: "Helldusk Armour", loc: "House of Hope", source: "Raphael", type: "Boss", slot: "body", desc: "AC 21. Vol. Maîtrise automatique.", relatedBuilds: ['fighter'] },
                    { name: "Gauntlets of Hill Giant Strength", loc: "House of Hope", source: "Archives", type: "Loot", slot: "hands", desc: "Fixe la Force à 23.", relatedBuilds: ['fighter'] },
                    { name: "Amulet of Greater Health", loc: "House of Hope", source: "Archives", type: "Loot", slot: "amulet", desc: "Fixe la Constitution à 23.", relatedBuilds: ['fighter'] },
                    { name: "Gloves of Soul Catching", loc: "House of Hope", source: "Hope (Quête)", type: "Quête", slot: "hands", desc: "+1d10 Force. Soin/Avantage. +2 CON. BiS Monk.", relatedBuilds: ['monk'] },
                    { name: "Viconia's Walking Fortress", loc: "House of Grief", source: "Viconia", type: "Boss", slot: "shield", desc: "AC +3. Renvoi sorts. Avantage JS. BiS Shield.", relatedBuilds: ['cleric', 'bard'] },
                    { name: "Sarevok's Horned Helmet", loc: "Temple de Bhaal", source: "Sarevok", type: "Boss", slot: "head", desc: "Réduit le seuil de critique de 1. Immunité Effroi.", relatedBuilds: ['fighter'] },
                    { name: "Balduran's Giantslayer", loc: "Wyrmway", source: "Ansur", type: "Boss", slot: "weapon", desc: "Double Mod Force aux dégâts. Forme de Géant. BiS Fighter.", relatedBuilds: ['fighter'] },
                    { name: "Gontr Mael", loc: "Steel Watch Foundry", source: "Titan", type: "Boss", slot: "bow", desc: "Légendaire. Haste Céleste (5 tours, pas de léthargie).", relatedBuilds: ['fighter'] },
                    { name: "Devotee's Mace", loc: "N/A", source: "Intervention Divine", type: "Classe", slot: "weapon", desc: "Aura d'Encens (Soin 1d4 passif/tour). Arme Clerc.", relatedBuilds: ['cleric'] }
                ]
            }
        ]
    }
];

const AtlasView = () => {
    const [activeAct, setActiveAct] = useState('act1');
    const [expandedZone, setExpandedZone] = useState('underdark');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Act Selector */}
            <div className="flex gap-4 border-b border-white/10 pb-4">
                {places.map(act => (
                    <button
                        key={act.id}
                        onClick={() => setActiveAct(act.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-300 ${activeAct === act.id
                            ? 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                            : 'bg-black/40 text-slate-500 hover:text-slate-200 hover:bg-white/5'
                            }`}
                    >
                        {act.name}
                    </button>
                ))}
            </div>

            <div className="grid gap-6">
                {places.find(a => a.id === activeAct)?.zones.map(zone => (
                    <div key={zone.id} className="group border border-white/5 bg-slate-900/40 rounded-xl overflow-hidden backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                        {/* Zone Header */}
                        <button
                            onClick={() => setExpandedZone(expandedZone === zone.id ? null : zone.id)}
                            className="w-full p-4 flex items-center justify-between bg-black/20 hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <MapPin className={`w-5 h-5 ${expandedZone === zone.id ? 'text-amber-500' : 'text-slate-600'}`} />
                                <span className={`text-lg font-bold uppercase tracking-wide ${expandedZone === zone.id ? 'text-amber-100' : 'text-slate-400'}`}>
                                    {zone.name}
                                </span>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${expandedZone === zone.id ? 'rotate-90 text-amber-500' : ''}`} />
                        </button>

                        {/* Items List */}
                        <div className={`transition-all duration-500 ease-in-out ${expandedZone === zone.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="p-4 grid gap-3">
                                {zone.items.map((item, idx) => (
                                    <div key={idx} className="bg-black/40 border border-white/5 rounded-lg p-3 flex flex-col md:flex-row gap-4 items-start md:items-center group/item hover:border-amber-500/30 hover:bg-slate-900/60 transition-all duration-200">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="text-amber-500/80" title={getSlotLabel(item.slot)}>
                                                    {getSlotIcon(item.slot)}
                                                </div>
                                                <span className="text-amber-200 font-bold text-sm group-hover/item:text-amber-400 transition-colors">{item.name}</span>
                                                <span className="text-[10px] bg-white/10 text-slate-400 px-1.5 rounded uppercase tracking-wider">{item.type}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>

                                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-right">
                                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Source</div>
                                                <div className="text-xs text-slate-300">{item.source}</div>
                                            </div>

                                            <div className="flex -space-x-2">
                                                {item.relatedBuilds.map(buildId => {
                                                    const char = characters.find(c => c.id === buildId);
                                                    if (!char) return null;
                                                    return (
                                                        <div key={buildId} className="w-8 h-8 rounded-full border border-slate-900 bg-slate-800 flex items-center justify-center text-slate-400 relative z-10 hover:z-20 hover:scale-110 transition-transform" title={char.name}>
                                                            <div className={`${char.color}`}>{char.icon}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function BG3Deck() {
    const [currentView, setCurrentView] = useState('builds'); // 'builds' | 'atlas'
    const [activeTab, setActiveTab] = useState(characters[0].id);
    const activeChar = characters.find(c => c.id === activeTab);

    // Animation State for transitions
    const [animating, setAnimating] = useState(false);

    // Tooltip State
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        setAnimating(true);
        const timer = setTimeout(() => setAnimating(false), 300);
        return () => clearTimeout(timer);
    }, [activeTab, currentView]);



    const getSlotIcon = (key) => {
        switch (key) {
            case 'head': return <Crown className="w-3 h-3" />;
            case 'body': return <Shirt className="w-3 h-3" />;
            case 'cloak': return <Eye className="w-3 h-3" />;
            case 'amulet': return <Link className="w-3 h-3" />;
            case 'hands': return <Hand className="w-3 h-3" />;
            case 'feet': return <Footprints className="w-3 h-3" />;
            case 'ring1': return <Component className="w-3 h-3" />;
            case 'ring2': return <Component className="w-3 h-3" />;
            case 'meleeMain': return <Sword className="w-3 h-3" />;
            case 'meleeOff': return <Shield className="w-3 h-3" />;
            case 'rangedMain': return <Target className="w-3 h-3" />;
            case 'rangedOff': return <Target className="w-3 h-3 opacity-70" />;
            default: return <Info className="w-3 h-3" />;
        }
    };

    const getSlotLabel = (key) => {
        switch (key) {
            case 'head': return 'Tête';
            case 'body': return 'Corps';
            case 'cloak': return 'Manteau';
            case 'amulet': return 'Amulette';
            case 'hands': return 'Mains';
            case 'feet': return 'Bottes';
            case 'ring1': return 'Anneau 1';
            case 'ring2': return 'Anneau 2';
            case 'meleeMain': return 'CàC Main';
            case 'meleeOff': return 'CàC Off';
            case 'rangedMain': return 'Dist. Main';
            case 'rangedOff': return 'Dist. Off';
            default: return key;
        }
    };

    return (
        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-amber-500/30 selection:text-white pb-12 overflow-x-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0 pointer-events-none"></div>
            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 z-0 pointer-events-none mix-blend-overlay"></div>

            {/* Header - Glassmorphism */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-black/50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentView('builds')}>
                        <div className="relative">
                            <Crown className="text-amber-500 w-8 h-8 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 tracking-wider uppercase drop-shadow-sm">
                                Honour Mode
                            </h1>
                            <p className="text-[10px] text-amber-500/80 tracking-[0.2em] uppercase font-bold">Dream Team Protocol</p>
                        </div>
                    </div>

                    {/* View Switcher Navigation */}
                    <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                        <button
                            onClick={() => setCurrentView('builds')}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${currentView === 'builds' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-slate-200'}`}
                        >
                            <Sword className="w-3 h-3" /> Builds
                        </button>
                        <button
                            onClick={() => setCurrentView('atlas')}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${currentView === 'atlas' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-200'}`}
                        >
                            <MapPin className="w-3 h-3" /> Atlas
                        </button>
                    </div>
                </div>
            </header>

            {/* War Room Modal - Cyberpunk Style */}


            <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">

                {currentView === 'atlas' ? (
                    <AtlasView />
                ) : (
                    <>
                        {/* Character Navigation - Neon Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            {characters.map((char) => (
                                <button
                                    key={char.id}
                                    onClick={() => { setActiveTab(char.id); }}
                                    className={`
                        relative overflow-hidden group flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-500
                        focus:outline-none
                        ${activeTab === char.id
                                            ? `bg-slate-900/80 ${char.border} ${char.glow} border-opacity-100 scale-105 shadow-[0_0_30px_-5px_var(--tw-shadow-color)] z-10`
                                            : 'bg-slate-900/30 border-slate-800/50 hover:bg-slate-800/50 hover:border-slate-600 opacity-60 hover:opacity-100 hover:scale-[1.02]'
                                        }
                    `}
                                >
                                    {/* Background gradient on active */}
                                    {activeTab === char.id && (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${char.accent} opacity-10`}></div>
                                    )}

                                    <div className={`relative z-10 transition-all duration-300 ${activeTab === char.id ? char.color : 'text-slate-500 group-hover:text-slate-300'} mb-3 transform group-hover:scale-110 group-hover:-translate-y-1`}>
                                        {char.icon}
                                    </div>
                                    <span className={`relative z-10 text-sm font-black uppercase tracking-wider ${activeTab === char.id ? 'text-white drop-shadow-md' : 'text-slate-500 group-hover:text-slate-200'}`}>
                                        {char.name}
                                    </span>
                                    <span className="relative z-10 text-[10px] text-slate-500 font-mono mt-2 bg-black/30 px-2 py-1 rounded border border-white/5">{char.classSplit}</span>
                                </button>
                            ))}
                        </div>

                        {/* Main Content Area - Animated */}
                        <div className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

                            {/* Header Card - No Border, just pure style */}
                            <div className={`p-8 rounded-2xl ${activeChar.bg} backdrop-blur-sm relative overflow-hidden mb-8 shadow-2xl`}>
                                {/* Ambient Background Glow */}
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeChar.accent} rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none`}></div>

                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                                        <div>
                                            <h2 className={`text-4xl font-black ${activeChar.color} mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>{activeChar.name}</h2>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="text-xs font-bold text-slate-300 bg-black/40 px-3 py-1.5 rounded-md border border-white/10 uppercase tracking-widest shadow-inner">
                                                    {activeChar.classSplit}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                {/* Character Details Grid */}
                                {/* Character Details Grid */}
                                <div className="grid md:grid-cols-2 gap-6 p-4 rounded-xl bg-black/20 border border-white/5">
                                    <div>
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Rôle Tactique</h3>
                                        <p className="text-slate-200 font-medium text-sm leading-relaxed">{activeChar.role}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Statut & Note</h3>
                                        <p className="text-slate-300 italic text-sm border-l-2 border-white/10 pl-3">"{activeChar.status}"</p>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className={`grid md:grid-cols-12 gap-8 transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

                            {/* Left Column: Progression */}
                            <div className="md:col-span-4 space-y-4">
                                <div className="bg-slate-900/40 rounded-2xl p-6 border border-white/5 backdrop-blur-sm shadow-xl h-full">
                                    <h3 className={`text-lg font-black ${activeChar.color} mb-6 flex items-center gap-3 border-b border-white/5 pb-4 uppercase tracking-wider`}>
                                        <Zap className="w-5 h-5" /> Progression
                                    </h3>
                                    <div className="space-y-6 relative pl-2">
                                        {/* Neon Line */}
                                        <div className={`absolute left-[29px] top-4 bottom-4 w-0.5 bg-gradient-to-b ${activeChar.accent} opacity-30`}></div>

                                        {activeChar.progression.map((step, idx) => (
                                            <div key={idx} className="relative z-10 flex gap-5 items-start group">
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center font-black ${activeChar.color} text-sm shadow-lg group-hover:scale-110 transition-transform duration-300 ring-1 ring-transparent group-hover:ring-${activeChar.color}/30`}>
                                                    {step.level === "Feats" || step.level === "Note" ? <Award className="w-5 h-5" /> : step.level}
                                                </div>
                                                <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex-1 hover:bg-white/5 hover:border-white/10 transition-colors duration-300">
                                                    <p className="text-sm text-slate-300 leading-snug">{step.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Gear */}
                            <div className="md:col-span-8 space-y-4">
                                <div className="bg-slate-900/40 rounded-2xl p-6 border border-white/5 backdrop-blur-sm shadow-xl h-full">
                                    <h3 className={`text-lg font-black ${activeChar.color} mb-6 flex items-center gap-3 border-b border-white/5 pb-4 uppercase tracking-wider`}>
                                        <Shield className="w-5 h-5" /> Arsenal & Équipement
                                    </h3>

                                    <div className="space-y-10">
                                        {activeChar.gear.map((act, actIdx) => (
                                            <div key={actIdx} className="group/act">
                                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center pl-1 border-b border-white/5 pb-2">
                                                    <ChevronRight className={`w-4 h-4 mr-2 ${activeChar.color} transition-transform group-hover/act:translate-x-1`} />
                                                    {act.act}
                                                </h4>

                                                {/* Grid Layout for Gear Slots */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {Object.entries(act.slots).map(([key, item], idx) => {
                                                        // Only render if item exists and name is not "-"
                                                        if (!item || item.name === '-') return null;
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="relative bg-black/30 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg flex flex-col group/item hover:-translate-y-0.5 overflow-visible"
                                                                onMouseEnter={() => setHoveredItem(`${actIdx}-${key}`)}
                                                                onMouseLeave={() => setHoveredItem(null)}
                                                            >
                                                                <div className="bg-white/5 px-3 py-2 flex items-center gap-2 border-b border-white/5 rounded-t-lg">
                                                                    <span className={`${activeChar.color} opacity-70`}>{getSlotIcon(key)}</span>
                                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{getSlotLabel(key)}</span>
                                                                </div>
                                                                <div className="p-3 flex-1 flex items-center">
                                                                    <span className="text-xs font-medium text-slate-300 leading-snug group-hover/item:text-white transition-colors">
                                                                        {item.name}
                                                                    </span>
                                                                </div>

                                                                {/* Render Tooltip if hovered */}
                                                                {hoveredItem === `${actIdx}-${key}` && (
                                                                    <GearTooltip item={item} color={activeChar.color} />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <BG3Deck />
        </React.StrictMode>
    );
}