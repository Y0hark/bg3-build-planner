import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Sword, Sun, Hand, Music, Shield, Zap, Skull, Crown, ChevronRight, Info, Award, MessageSquare, Loader, Sparkles, Send, Gem, X, Activity, Shirt, Footprints, Component, Eye, MapPin, ShoppingBag, Scroll, Link } from 'lucide-react';

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
                    head: { name: "Haste Helm", loc: "Village Dévasté", source: "Coffre (près du chariot)", type: "Loot", desc: "Au début du combat, gagnez Élan pendant 3 tours (+1.5m vitesse)." },
                    body: { name: "Adamantine Splint Armour", loc: "Grymforge", source: "Forge (Moule + Mithral)", type: "Craft", desc: "Réduit tous les dégâts de 2. Immunité aux Critiques. Envoie 'Chancelant' aux attaquants." },
                    cloak: { name: "Deathstalker Mantle", loc: "Camp", source: "Cadeau Sceleritas Fel", type: "Quête (Dark Urge)", desc: "Invisibilité pendant 2 tours après avoir tué un ennemi. (Exclusif Dark Urge)." },
                    amulet: { name: "Broodmother's Revenge", loc: "Bosquet des Druides", source: "Kagha (Loot)", type: "Loot", desc: "Lorsque vous êtes soigné, votre arme s'enduit de poison (+1d6 Dégâts)." },
                    hands: { name: "Gloves of the Growling Underdog", loc: "Camp Gobelin", source: "Trésor de Dror Ragzlin", type: "Loot", desc: "Avantage aux jets d'attaque si entouré par 2 ennemis ou plus." },
                    feet: { name: "Disintegrating Night Walkers", loc: "Grymforge", source: "Nere (Boss)", type: "Loot", desc: "Immunité : Enchevêtré, En toile, Glissade. Sort : Pas brumeux." },
                    ring1: { name: "Caustic Band", loc: "Colonie Myconide", source: "Derryth Bonecloak", type: "Marchand", desc: "Vos attaques d'arme infligent +2 Dégâts d'Acide." },
                    ring2: { name: "Crusher's Ring", loc: "Camp Gobelin", source: "Crusher", type: "Loot", desc: "+3m de vitesse de déplacement." },
                    main: { name: "Unseen Menace", loc: "Crèche Y'llek", source: "Intendant des Githyanki", type: "Marchand", desc: "Invisible (Avantage attaques). Critique sur 19-20." },
                    sub: { name: "Titanstring Bow", loc: "Repaire Zhentarim", source: "Brem", type: "Marchand", desc: "Ajoute le modificateur de Force aux dégâts (en plus de la DEX)." }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Flawed Helldusk Helmet", loc: "Last Light Inn", source: "Dammon (Donner Fer Infernal)", type: "Craft", desc: "+2 Sauvegarde Constitution. +1 AC vs Sorts." },
                    body: { name: "Dwarven Splintmail", loc: "Moonrise Towers", source: "Lann Tarv", type: "Marchand", desc: "AC 19. -1 Dégâts subis. +2 Constitution." },
                    cloak: { name: "Cloak of Protection", loc: "Last Light Inn", source: "Quartermaster Talli", type: "Marchand", desc: "+1 Classe d'Armure. +1 Jets de Sauvegarde." },
                    amulet: { name: "Surgeon's Subjugation Amulet", loc: "Maison de la Guérison", source: "Malus Thorm", type: "Boss", desc: "Une fois par long repos, un critique paralyse l'humanoïde touché pendant 2 tours." },
                    hands: { name: "Flawed Helldusk Gloves", loc: "Last Light Inn", source: "Dammon", type: "Craft", desc: "Vos attaques d'arme infligent +1d4 Feu. +1 For JS." },
                    feet: { name: "Evasive Shoes", loc: "Last Light Inn", source: "Mattis", type: "Marchand", desc: "+1 Classe d'Armure. +1 Acrobatie." },
                    ring1: { name: "Risky Ring", loc: "Moonrise Towers", source: "Araj Oblodra", type: "Marchand", desc: "Avantage sur TOUTES les attaques. Désavantage aux JS." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet (Acte 1)", source: "Mol (Quête de l'Idole)", type: "Quête", desc: "+1 Classe d'Armure. +1 Jets de Sauvegarde." },
                    main: { name: "Halberd of Vigilance", loc: "Moonrise Towers", source: "Lann Tarv", type: "Marchand", desc: "+1d4 Force. Avantage Attaques d'Opportunité. +1 Initiative." },
                    sub: { name: "Hellfire Engine Crossbow", loc: "Foundry (Acte 3)", source: "Craft", type: "Craft", desc: "Accès à Lightning Arrow. Repositionnement." }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Helm of Balduran", loc: "Wyrmway", source: "Ansur", type: "Boss", desc: "+2 AC. Régénération 2PV/tour. Immunité Critiques & Étourdissement." },
                    body: { name: "Helldusk Armour", loc: "House of Hope", source: "Raphael", type: "Boss", desc: "AC 21. Maîtrise automatique. Résistance Feu. Vol." },
                    cloak: { name: "Cloak of Displacement", loc: "Wyrm's Crossing", source: "Danthelon", type: "Marchand", desc: "Les ennemis ont Désavantage pour vous attaquer jusqu'à ce que vous soyez touché." },
                    amulet: { name: "Amulet of Greater Health", loc: "House of Hope", source: "Archives", type: "Loot", desc: "Fixe la Constitution à 23. Avantage aux JS de Constitution." },
                    hands: { name: "Gauntlets of Hill Giant Strength", loc: "House of Hope", source: "Archives", type: "Loot", desc: "Fixe la Force à 23. +1 JS Force." },
                    feet: { name: "Boots of Persistence", loc: "Lower City", source: "Dammon", type: "Marchand", desc: "Liberté de mouvement (Permanent). +1 JS DEX." },
                    ring1: { name: "Ring of Regeneration", loc: "Sorcerous Sundries", source: "Rolan/Lorroakan", type: "Marchand", desc: "Au début de votre tour, récupérez 1d4 PV." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet", source: "Mol", type: "Quête", desc: "+1 AC / +1 JS." },
                    main: { name: "Balduran's Giantslayer", loc: "Wyrmway", source: "Ansur", type: "Boss", desc: "Double bonus de Force aux dégâts. Forme de Géant (Avantage, +1d6, PV temp)." },
                    sub: { name: "Gontr Mael", loc: "Foundry", source: "Titan d'Acier", type: "Boss", desc: "Haste Céleste (5 tours, pas de léthargie). Bolt of Guiding." }
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
            { level: "1-3", text: "Commencez Clerc (Domaine de la Lumière). Sorts : Bless, Healing Word, Spiritual Weapon." },
            { level: 4, text: "Feat : Tireur de Sorts (Spell Sniper). Prenez 'Décharge Occulte' (Eldritch Blast). Critique sur 19-20." },
            { level: 5, text: "Clerc 5 : Spirit Guardians (Gardiens Spirituels). Le sort clé du build." },
            { level: 6, text: "Multiclass Druide 1. Sorts : Shillelagh, Thorn Whip (pour attirer les ennemis dans les gardiens)." },
            { level: 7, text: "Druide 2 (Cercle des Étoiles). Action Bonus : Forme de Dragon (INT/WIS concentration ne peut pas être inférieure à 10)." },
            { level: "8-12", text: "Retour en Clerc jusqu'au niveau 12 (Clerc 10 / Druide 2). Niv 8 Feat : Vigilant (Alert)." }
        ],
        gear: [
            {
                act: "Acte 1",
                slots: {
                    head: { name: "Holy Lance Helm", loc: "Monastère de Rosymorn", source: "Coffre peint", type: "Loot", desc: "Les ennemis qui vous ratent prennent 1d4 Radiant (Déclenche Orbes)." },
                    body: { name: "Luminous Armour", loc: "Poste de Séluné (Underdark)", source: "Coffre secret", type: "Loot", desc: "Dégâts Radiants = Onde de choc (Orbe Radiant de zone)." },
                    cloak: { name: "Cape of Protection", loc: "Last Light Inn (début Acte 2)", source: "Talli", type: "Marchand", desc: "+1 AC / +1 JS. En attendant la Thunderskin." },
                    amulet: { name: "Pearl of Power Amulet", loc: "Colonie Myconide", source: "Omeluum", type: "Marchand", desc: "Restaure un emplacement de sort de niveau 3 ou inférieur (Action)." },
                    hands: { name: "Gloves of Belligerent Skies", loc: "Crèche Y'llek", source: "Coffre de l'Inquisiteur", type: "Loot", desc: "Tonnerre/Radiant/Éclair infligent 'Réverbération'." },
                    feet: { name: "Boots of Stormy Clamour", loc: "Tour Arcanique", source: "Omeluum", type: "Marchand", desc: "Appliquer une condition inflige 'Réverbération'." },
                    ring1: { name: "The Whispering Promise", loc: "Camp Gobelin", source: "Volo/Grat", type: "Marchand", desc: "Soigner = Béni (+1d4 Toucher/JS)." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet", source: "Mol", type: "Quête", desc: "+1 AC / +1 JS." },
                    main: { name: "Phalar Aluve", loc: "Underdark", source: "Rocher", type: "Loot", desc: "Mélodie : Hurlement (-1d4 aux JS ennemis pour aider les sorts)." },
                    sub: { name: "Adamantine Shield", loc: "Grymforge", source: "Forge", type: "Craft", desc: "Immunité Critiques. Envoie 'Chancelant' sur l'attaquant." }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Holy Lance Helm", loc: "Monastère", source: "Coffre", type: "Loot", desc: "BiS. Synergie totale avec la haute AC." },
                    body: { name: "Luminous Armour", loc: "Underdark", source: "Coffre", type: "Loot", desc: "Indispensable pour l'application de masse des orbes." },
                    cloak: { name: "Thunderskin Cloak", loc: "Moonrise Towers", source: "Araj Oblodra", type: "Marchand", desc: "Si une créature avec Réverb vous tape, elle devient 'Hébétée' (Dazed)." },
                    amulet: { name: "Spineshudder Amulet", loc: "Moonrise Towers", source: "Mimic (Chambre de Ketheric)", type: "Loot", desc: "Une attaque de sort à distance (Eldritch Blast) inflige 'Réverbération'." },
                    hands: { name: "Gloves of Belligerent Skies", loc: "Crèche", source: "-", type: "Core", desc: "Réverbération sur dégâts radiants/tonnerre." },
                    feet: { name: "Boots of Stormy Clamour", loc: "Underdark", source: "-", type: "Core", desc: "Stack Réverbération très vite." },
                    ring1: { name: "Coruscation Ring", loc: "Last Light Inn", source: "Cave", type: "Loot", desc: "Dégâts de sorts (Eldritch Blast) = Orbe Radiant x2." },
                    ring2: { name: "Ring of Spiteful Thunder", loc: "Moonrise Towers", source: "Roah Moonglow", type: "Marchand", desc: "Dégâts Tonnerre sur cible avec Réverb = Hébété (Dazed)." },
                    main: { name: "Blood of Lathander", loc: "Monastère", source: "Quête", type: "Légendaire", desc: "Aveuglement de zone + Rayon de Soleil." },
                    sub: { name: "Ketheric's Shield", loc: "Moonrise Towers", source: "Ketheric", type: "Boss", desc: "+1 DD Sorts." }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Holy Lance Helm", loc: "Acte 1", source: "-", type: "-", desc: "Reste très fort si vous tankez au corps à corps." },
                    body: { name: "Luminous Armour", loc: "Acte 1", source: "-", type: "-", desc: "Toujours BiS." },
                    cloak: { name: "Thunderskin Cloak", loc: "Acte 2", source: "-", type: "-", desc: "Contrôle passif via Réverbération." },
                    amulet: { name: "Amulet of the Devout", loc: "Stormshore Tabernacle", source: "Sous-sol (Attention malédiction)", type: "Loot", desc: "+2 au DD de vos sorts. Une canalisation divine supplémentaire." },
                    hands: { name: "Gloves of Belligerent Skies", loc: "Acte 1", source: "-", type: "-", desc: "Le moteur à Réverbération." },
                    feet: { name: "Helldusk Boots", loc: "Wyrm's Rock", source: "Gortash", type: "Loot", desc: "Immunité aux déplacements forcés + TP." },
                    ring1: { name: "Coruscation Ring", loc: "Acte 2", source: "-", type: "-", desc: "Transforme Eldritch Blast en debuff nucléaire." },
                    ring2: { name: "Ring of Spiteful Thunder", loc: "Acte 2", source: "-", type: "-", desc: "Stun/Daze constant." },
                    main: { name: "Devotee's Mace", loc: "Intervention Divine", source: "Niv 10", type: "Classe", desc: "Soin de zone passif chaque tour." },
                    sub: { name: "Viconia's Walking Fortress", loc: "House of Grief", source: "Viconia", type: "Boss", desc: "AC +3, Renvoi de sorts, Avantage JS." }
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
        role: "Dégâts monocibles absurdes, Stun les Boss",
        status: "Dépendant des Élixirs de Force.",
        progression: [
            { level: "Note", text: "STATS: Max DEX/SAG, FOR à 8. Buvez des Élixirs de Force chaque matin !" },
            { level: "1-6", text: "Monk (Open Hand). Niv 6: Poings magiques." },
            { level: 4, text: "Feat: Tavern Brawler (+1 CON)." },
            { level: "7-9", text: "Multiclass Rogue -> Thief (Niv 3). Action Bonus supplémentaire." },
            { level: 10, text: "Rogue 4 -> Feat: Alert ou ASI +2 Sagesse." },
            { level: "11-12", text: "Retour en Monk." }
        ],
        gear: [
            {
                act: "Acte 1",
                slots: {
                    head: { name: "Haste Helm", loc: "Village Dévasté", source: "Coffre", type: "Loot", desc: "Élan au début du combat pour atteindre les cibles." },
                    body: { name: "The Graceful Cloth", loc: "Monastère (Route)", source: "Lady Esther", type: "Marchand", desc: "+2 DEX. Avantage aux tests de DEX. Saut amélioré." },
                    cloak: { name: "Deathstalker Mantle", loc: "Camp", source: "Dark Urge", type: "Quête", desc: "L'invisibilité est incroyable pour le Monk Assassin." },
                    amulet: { name: "Sentient Amulet", loc: "Grymforge", source: "Élémentaire de Lave (Coffre)", type: "Quête", desc: "Restoration de Ki (Action Bonus) et Shatter." },
                    hands: { name: "The Sparkle Hands", loc: "Putrid Bog", source: "Coffre (Arbre)", type: "Loot", desc: "Les attaques à mains nues gagnent des Charges de Foudre." },
                    feet: { name: "Boots of Speed", loc: "Colonie Myconide", source: "Thulla", type: "Quête", desc: "Action Bonus : Dash (Double vitesse)." },
                    ring1: { name: "Crusher's Ring", loc: "Camp Gobelin", source: "Crusher", type: "Loot", desc: "+3m de mouvement." },
                    ring2: { name: "Ring of Protection", loc: "Bosquet", source: "Mol", type: "Quête", desc: "Compense la faible AC sans armure." },
                    main: { name: "Mains Nues", loc: "-", source: "Vous-même", type: "Inné", desc: "Vos poings sont des armes mortelles." },
                    sub: { name: "Mains Nues", loc: "-", source: "-", type: "-", desc: "Tavern Brawler ajoute 2x la Force aux dégâts." }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Hat of Uninhibited Kushigo", loc: "Last Light Inn", source: "Quartermaster Talli", type: "Marchand", desc: "+1 DD des sorts (Stunning Strike) quand vous frappez à mains nues." },
                    body: { name: "The Graceful Cloth", loc: "Acte 1", source: "Lady Esther", type: "Marchand", desc: "Toujours BiS pour les dégâts offensifs." },
                    cloak: { name: "Cloak of Protection", loc: "Last Light Inn", source: "Talli", type: "Marchand", desc: "+1 AC." },
                    amulet: { name: "Sentient Amulet", loc: "Grymforge", source: "Keep", type: "Quête", desc: "La restoration de Ki est trop précieuse." },
                    hands: { name: "Gloves of Crushing", loc: "Moonrise Towers", source: "Lann Tarv", type: "Marchand", desc: "+1 Toucher, +2 Dégâts aux attaques à mains nues." },
                    feet: { name: "Boots of Uninhibited Kushigo", loc: "Plan Astral (Prélude Acte 3)", source: "Githyanki Monks", type: "Loot", desc: "Ajoute le modificateur de Sagesse aux dégâts à mains nues." },
                    ring1: { name: "Shadow-Cloaked Ring", loc: "Maison de la Guérison", source: "Ombres", type: "Loot", desc: "+1d4 dégâts contre les créatures dans l'ombre." },
                    ring2: { name: "Risky Ring", loc: "Moonrise Towers", source: "Araj", type: "Marchand", desc: "Garantit que les Stunning Strikes passent." },
                    main: { name: "Mains Nues", loc: "-", source: "-", type: "-", desc: "Les dégâts scalent avec le niveau." },
                    sub: { name: "Mains Nues", loc: "-", source: "-", type: "-", desc: "-" }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Mask of Soul Perception", loc: "Devil's Fee", source: "Coffre (Helsik)", type: "Loot", desc: "+2 Toucher. +2 Initiative. Perception de l'âme." },
                    body: { name: "Vest of Soul Rejuvenation", loc: "Sorcerous Sundries", source: "Lorroakan (Projection)", type: "Marchand", desc: "+2 AC. Réaction : Attaque à mains nues si un ennemi vous rate." },
                    cloak: { name: "Cloak of Displacement", loc: "Wyrm's Crossing", source: "Danthelon", type: "Marchand", desc: "Désavantage aux ennemis. Active la Vest of Soul Rejuvenation." },
                    amulet: { name: "Khalid's Gift", loc: "Lower City", source: "Maison de Jaheira (Sous-sol)", type: "Loot", desc: "+1 Sagesse (peut monter à 21). Aide au scaling des bottes Kushigo." },
                    hands: { name: "Gloves of Soul Catching", loc: "House of Hope", source: "Sauver Hope", type: "Quête", desc: "+1d10 Force. Soin 10PV par coup OU Avantage. +2 CON." },
                    feet: { name: "Boots of Uninhibited Kushigo", loc: "Plan Astral", source: "Loot", type: "Loot", desc: "Sagesse aux dégâts (Indispensable)." },
                    ring1: { name: "Ring of Free Action", loc: "Moonrise (Araj)", source: "Marchand", type: "Marchand", desc: "Ignore les terrains difficiles. Immunité à la paralysie." },
                    ring2: { name: "Killer's Sweetheart", loc: "Gauntlet of Shar", source: "Épreuve", type: "Loot", desc: "Garantit un critique après avoir tué une cible." },
                    main: { name: "Mains Nues", loc: "-", source: "-", type: "-", desc: "Dégâts finaux ~40-60 par coup x 6 coups." },
                    sub: { name: "Mains Nues", loc: "-", source: "-", type: "-", desc: "-" }
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
        role: "8 Attaques T1 + Contrôle de masse irrésistible",
        status: "DPS Acte 1/2 -> God Mode Acte 3.",
        progression: [
            { level: 1, text: "Fighter (CON Saves, Armure Lourde). Style: Archery." },
            { level: "2-7", text: "Bard (College of Swords)." },
            { level: 5, text: "Feat: Sharpshooter (-5 toucher / +10 dégâts)." },
            { level: 8, text: "Fighter 2 (Action Surge)." },
            { level: "9-12", text: "Bard jusqu'au niv 10 (Secrets: Command, Counterspell)." }
        ],
        gear: [
            {
                act: "Acte 1",
                slots: {
                    head: { name: "Diadem of Arcane Synergy", loc: "Crèche Y'llek", source: "Ardent Jhe'rezath", type: "Loot", desc: "Gagnez 'Synergie Arcanique' (Mod d'incantation aux dégâts d'arme) après avoir infligé une condition." },
                    body: { name: "Spidersilk Armour", loc: "Shattered Sanctum", source: "Minthara", type: "Boss", desc: "+1 Discrétion. Avantage JS Constitution (Concentration)." },
                    cloak: { name: "Cape", loc: "Random", source: "-", type: "Loot", desc: "Pas de cape majeure en Acte 1 pour ce build." },
                    amulet: { name: "Amulet of Branding", loc: "Crèche Y'llek", source: "A'jak'nir Jeera", type: "Marchand", desc: "Marque une cible (Vulnérabilité aux dégâts contondants/tranchants/perçants)." },
                    hands: { name: "Gloves of Dexterity", loc: "Crèche Y'llek", source: "Jeera", type: "Marchand", desc: "Fixe la DEX à 18. +1 Attaque." },
                    feet: { name: "Boots of Striding", loc: "Shattered Sanctum", source: "Minthara", type: "Boss", desc: "Immunité : Renversé/Poussé tant que vous vous concentrez." },
                    ring1: { name: "Caustic Band", loc: "Underdark", source: "Derryth", type: "Marchand", desc: "+2 Acide aux attaques d'arme." },
                    ring2: { name: "Strange Conduit Ring", loc: "Crèche Y'llek", source: "Coffre Inquisiteur", type: "Loot", desc: "+1d4 Psychique si concentré." },
                    main: { name: "Phalar Aluve", loc: "Underdark", source: "Rocher (X:116 Y:-192)", type: "Loot", desc: "Capacité 'Hurler' : -1d4 aux JS ennemis (Prépare le contrôle)." },
                    sub: { name: "Titanstring Bow", loc: "Zhentarim", source: "Brem", type: "Marchand", desc: "Ajoute la Force aux dégâts (utilisez des élixirs)." }
                }
            },
            {
                act: "Acte 2",
                slots: {
                    head: { name: "Helmet of Arcane Acuity", loc: "Reithwin (Guilde des Maçons)", source: "Coffre sous-sol", type: "Loot", desc: "Attaques d'armes donnent 'Acuité Arcanique' (+1 DD Sorts par charge). BiS absolu." },
                    body: { name: "Yuan-Ti Scale Mail", loc: "Last Light Inn", source: "Talli", type: "Marchand", desc: "AC 15 + DEX complète (Pas de limite +2). +1 Initiative." },
                    cloak: { name: "Cloak of Protection", loc: "Last Light Inn", source: "Talli", type: "Marchand", desc: "+1 AC / +1 JS." },
                    amulet: { name: "Amulet of the Harpers", loc: "Last Light Inn", source: "Talli", type: "Marchand", desc: "Sort : Bouclier (Réaction +5 AC). Indispensable pour la survie." },
                    hands: { name: "Gloves of Dexterity", loc: "Acte 1", source: "-", type: "-", desc: "Permet de dump la DEX et maxer le Charisme." },
                    feet: { name: "Evasive Shoes", loc: "Last Light Inn", source: "Mattis", type: "Marchand", desc: "+1 AC." },
                    ring1: { name: "Killer's Sweetheart", loc: "Gauntlet of Shar", source: "Loot", type: "Loot", desc: "Critique garanti sur demande." },
                    ring2: { name: "Strange Conduit Ring", loc: "Acte 1", source: "-", type: "-", desc: "Dégâts constants grâce à la concentration." },
                    main: { name: "Knife of the Undermountain King", loc: "Crèche", source: "Jeera", type: "Marchand", desc: "Critique sur 19-20. Relance les dégâts faibles." },
                    sub: { name: "Ne'er Misser", loc: "Moonrise Towers", source: "Roah Moonglow", type: "Marchand", desc: "Dégâts de Force. Sort : Magic Missile (Niv 3)." }
                }
            },
            {
                act: "Acte 3",
                slots: {
                    head: { name: "Helmet of Arcane Acuity", loc: "Acte 2", source: "-", type: "Core", desc: "Augmente le DD des sorts jusqu'à +10. Rend les contrôles irrésistibles." },
                    body: { name: "Armour of Agility", loc: "Lower City", source: "Gloomy Funder", type: "Marchand", desc: "AC 17 + DEX complète. +2 JS." },
                    cloak: { name: "Nymph Cloak", loc: "Danthelon's Dancing Axe", source: "Danthelon", type: "Marchand", desc: "Sort : Domination de Personne (Humanoïde)." },
                    amulet: { name: "Spellcrux Amulet", loc: "Moonrise Towers", source: "Warden", type: "Loot", desc: "Restaure un emplacement de sort de n'importe quel niveau (Action Bonus)." },
                    hands: { name: "Legacy of the Masters", loc: "Lower City", source: "Dammon", type: "Marchand", desc: "+2 Toucher/Dégâts aux armes. +1 STR JS." },
                    feet: { name: "Helldusk Boots", loc: "Wyrm's Rock", source: "Gortash", type: "Loot", desc: "Téléportation." },
                    ring1: { name: "Band of the Mystic Scoundrel", loc: "Jungle (Cirque)", source: "Akabi (Jackpot)", type: "Loot", desc: "Après une attaque d'arme, lancez Illusion/Enchantement en Action Bonus." },
                    ring2: { name: "Ring of Regeneration", loc: "Sorcerous Sundries", source: "Rolan", type: "Marchand", desc: "Soin passif." },
                    main: { name: "Rhapsody", loc: "Palais de Cazador", source: "Cazador", type: "Boss", desc: "+3 Toucher/Dégâts/DD Sorts après avoir tué 3 ennemis." },
                    sub: { name: "The Dead Shot", loc: "Lower City", source: "Fytz", type: "Marchand", desc: "Double le bonus de maîtrise au toucher. Critique 19-20." }
                }
            }
        ]
    }
];

// --- AI Service ---
const apiKey = ""; // Set by environment
const callGemini = async (prompt) => {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        if (!response.ok) throw new Error('AI request failed');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur de réponse de l'IA.";
    } catch (error) {
        console.error(error);
        return "Désolé, l'assistant tactique est indisponible pour le moment.";
    }
};

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

export default function BG3Deck() {
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
    }, [activeTab]);

    // Character AI State
    const [showAI, setShowAI] = useState(false);
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Global War Room State
    const [showWarRoom, setShowWarRoom] = useState(false);
    const [warRoomMode, setWarRoomMode] = useState('boss'); // 'boss' or 'loot'
    const [warRoomQuery, setWarRoomQuery] = useState('');
    const [warRoomResponse, setWarRoomResponse] = useState('');
    const [isWarRoomLoading, setIsWarRoomLoading] = useState(false);

    const handleAskAI = async () => {
        if (!aiQuery.trim()) return;
        setIsLoading(true);
        setAiResponse('');

        const prompt = `Tu es un expert de Baldur's Gate 3, spécialisé dans le mode Honneur.
    Le joueur consulte le build suivant : ${JSON.stringify(activeChar)}.
    
    Question du joueur : "${aiQuery}"
    
    Réponds de manière concise, tactique et précise en français.`;

        const result = await callGemini(prompt);
        setAiResponse(result);
        setIsLoading(false);
    };

    const handleWarRoomAsk = async () => {
        if (!warRoomQuery.trim()) return;
        setIsWarRoomLoading(true);
        setWarRoomResponse('');

        const teamContext = characters.map(c => `${c.name} (${c.classSplit})`).join(', ');

        let prompt = "";
        if (warRoomMode === 'loot') {
            prompt = `Tu es un expert en optimisation de Baldur's Gate 3 (Mode Honneur).
      Voici l'équipe du joueur : ${teamContext}. Le joueur a trouvé : "${warRoomQuery}".
      Analyse cet objet pour l'équipe. Réponds en français.`;
        } else {
            prompt = `Tu es un général tacticien expert de Baldur's Gate 3 (Mode Honneur).
      Voici l'équipe du joueur : ${teamContext}. Le joueur affronte : "${warRoomQuery}".
      Donne une stratégie de combat détaillée. Réponds en français.`;
        }

        const result = await callGemini(prompt);
        setWarRoomResponse(result);
        setIsWarRoomLoading(false);
    };

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
            case 'main': return <Sword className="w-3 h-3" />;
            case 'sub': return <Shield className="w-3 h-3" />;
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
            case 'main': return 'Main D.';
            case 'sub': return 'Main G.';
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
                    <div className="flex items-center gap-3 group cursor-pointer">
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
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowWarRoom(true)}
                            className="hidden md:flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800 border border-red-500/30 hover:border-red-500/80 text-amber-100 px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 group focus:outline-none ring-1 ring-transparent focus:ring-red-500/50"
                        >
                            <Sparkles className="w-4 h-4 text-red-400 group-hover:animate-spin-slow" />
                            <span className="group-hover:text-white transition-colors">Salle de Guerre</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* War Room Modal - Cyberpunk Style */}
            {showWarRoom && (
                <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-slate-950 w-full max-w-2xl rounded-lg border border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.2)] flex flex-col max-h-[85vh] overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

                        {/* Modal Header */}
                        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/40">
                            <h2 className="text-xl font-black text-red-500 flex items-center gap-2 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">
                                <Sparkles className="w-5 h-5" /> Salle de Guerre Tactique
                            </h2>
                            <button onClick={() => setShowWarRoom(false)} className="text-slate-500 hover:text-white transition-colors hover:rotate-90 duration-300 focus:outline-none">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex border-b border-white/5 bg-black/20">
                            <button
                                onClick={() => { setWarRoomMode('boss'); setWarRoomResponse(''); }}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none ${warRoomMode === 'boss' ? 'bg-red-950/20 text-red-400 border-b-2 border-red-500 shadow-[inset_0_-10px_20px_-10px_rgba(220,38,38,0.2)]' : 'text-slate-600 hover:text-slate-300 hover:bg-white/5'}`}
                            >
                                <Skull className="w-4 h-4" /> Stratégie Boss
                            </button>
                            <button
                                onClick={() => { setWarRoomMode('loot'); setWarRoomResponse(''); }}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none ${warRoomMode === 'loot' ? 'bg-blue-950/20 text-blue-400 border-b-2 border-blue-500 shadow-[inset_0_-10px_20px_-10px_rgba(59,130,246,0.2)]' : 'text-slate-600 hover:text-slate-300 hover:bg-white/5'}`}
                            >
                                <Gem className="w-4 h-4" /> Conseiller Butin
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1 bg-gradient-to-b from-slate-950 to-black">
                            <div className="mb-6 relative">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    {warRoomMode === 'boss' ? "IDENTIFICATION CIBLE" : "ANALYSE ARTEFACT"}
                                </label>
                                <div className="flex gap-2 relative group">
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/20 to-blue-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <input
                                        type="text"
                                        value={warRoomQuery}
                                        onChange={(e) => setWarRoomQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleWarRoomAsk()}
                                        placeholder={warRoomMode === 'boss' ? "Ex: Raphael, Ansur..." : "Ex: Gloves of Dexterity..."}
                                        className="relative z-10 flex-1 bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] focus:outline-none placeholder-slate-600 transition-all duration-300"
                                    />
                                    <button
                                        onClick={handleWarRoomAsk}
                                        disabled={isWarRoomLoading || !warRoomQuery.trim()}
                                        className="relative z-10 bg-gradient-to-br from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 disabled:opacity-50 disabled:grayscale text-white px-6 rounded-lg font-bold transition-all duration-300 flex items-center shadow-lg hover:shadow-red-900/40 active:scale-95 focus:outline-none"
                                    >
                                        {isWarRoomLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {warRoomResponse ? (
                                <div className="bg-slate-900/50 p-6 rounded-lg border border-white/10 animate-in fade-in slide-in-from-bottom-4 shadow-inner">
                                    <h3 className="text-red-500 font-bold mb-4 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-red-500/20 pb-2">
                                        <Activity className="w-4 h-4 animate-pulse" /> Analyse Tactique
                                    </h3>
                                    <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                                        {warRoomResponse}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-16 text-slate-700 flex flex-col items-center justify-center gap-4">
                                    <div className={`p-4 rounded-full bg-slate-900/50 border border-slate-800 ${warRoomMode === 'boss' ? 'text-red-900' : 'text-blue-900'}`}>
                                        {warRoomMode === 'boss' ? <Skull className="w-12 h-12 opacity-50" /> : <Gem className="w-12 h-12 opacity-50" />}
                                    </div>
                                    <p className="text-xs uppercase tracking-widest font-bold opacity-50">En attente de données...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">

                {/* Intro Banner - Styled */}


                {/* Character Navigation - Neon Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {characters.map((char) => (
                        <button
                            key={char.id}
                            onClick={() => { setActiveTab(char.id); setShowAI(false); setAiResponse(''); setAiQuery(''); }}
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

                                <button
                                    onClick={() => setShowAI(!showAI)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg focus:outline-none ring-1 ring-transparent focus:ring-current ${showAI ? `${activeChar.color} bg-black border-current shadow-[0_0_15px_-3px_currentColor]` : 'bg-black/20 border-white/10 text-slate-400 hover:text-white hover:bg-black/40 hover:border-white/30'}`}
                                >
                                    <MessageSquare className="w-3 h-3" />
                                    {showAI ? 'Fermer Assistant' : 'Assistant Perso'}
                                </button>
                            </div>

                            {/* Character Details Grid */}
                            {!showAI && (
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
                            )}

                            {/* AI Section (Individual) - Smooth Expand */}
                            {showAI && (
                                <div className="mt-4 bg-black/60 p-5 rounded-xl border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-2">
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            placeholder={`Une question sur ${activeChar.name} ?`}
                                            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/50 text-white placeholder-slate-600 transition-colors"
                                            value={aiQuery}
                                            onChange={(e) => setAiQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                                        />
                                        <button
                                            onClick={handleAskAI}
                                            disabled={isLoading || !aiQuery.trim()}
                                            className={`bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-5 rounded-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/20`}
                                        >
                                            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {aiResponse && (
                                        <div className="text-sm text-slate-200 bg-slate-900/80 p-4 rounded-lg border-l-2 border-amber-500 leading-relaxed whitespace-pre-wrap font-mono shadow-lg">
                                            <strong className="text-amber-500 block mb-2 text-xs uppercase tracking-widest">Réponse Tactique :</strong>
                                            {aiResponse}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">

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
                                                {Object.entries(act.slots).map(([key, item], idx) => (
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
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
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