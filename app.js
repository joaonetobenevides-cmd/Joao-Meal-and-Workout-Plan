'use strict';

/* ── configuration (props in the design prototype) ─────────────────────── */
const WEIGHT_UNIT = 'kg';          // 'kg' | 'lb'
// 'link' opens YouTube search results for the exercise (YouTube app on phones).
// 'inline' embeds a search player, but YouTube deprecated listType=search
// embeds, so they show "unavailable" — keep 'link' unless that changes.
const VIDEO_MODE = 'link';
const DEFAULT_TAB = 'week';        // 'week' | 'reference' | 'progress'

/* ── plan data ──────────────────────────────────────────────────────────── */
const WEEKDAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const DAY_META = {
  monday:{abbr:'Mon',full:'Monday'}, tuesday:{abbr:'Tue',full:'Tuesday'}, wednesday:{abbr:'Wed',full:'Wednesday'},
  thursday:{abbr:'Thu',full:'Thursday'}, friday:{abbr:'Fri',full:'Friday'}, saturday:{abbr:'Sat',full:'Saturday'}, sunday:{abbr:'Sun',full:'Sunday'}
};

const MEAL_WEEKS = {
  1: {
    monday: { type:'low-appetite', totals:{kcal:1600,protein:145,carbs:140,fat:50,fibre:25}, meals:[
      {time:'Morning', text:'Smoothie: lactose-free whey isolate (or egg-white protein) 30 g, lactose-free milk 250 ml (or soy milk), 1 banana, peanut butter 10 g', protein:38},
      {time:'Midday', text:'3 scrambled eggs, white rice 150 g cooked (small, soft portion)', protein:22},
      {time:'Afternoon', text:'Lactose-free Greek yoghurt 200 g + honey 10 g (or soy yoghurt)', protein:20},
      {time:'Early dinner', text:'Blended chicken-vegetable-rice soup ~400 ml (chicken 120 g, carrot, courgette)', protein:35},
      {time:'Evening', text:'Lactose-free skyr 170 g; psyllium 5 g in a full glass of water', protein:25},
    ]},
    tuesday: { type:'training', totals:{kcal:2100,protein:165,carbs:215,fat:60,fibre:33}, meals:[
      {time:'Breakfast', text:'Bowl: lactose-free Greek yoghurt 250 g (or soy yoghurt + 1/2 scoop), chia 15 g, buckwheat flakes 40 g, berries 100 g', protein:30},
      {time:'Pre-training', text:'1 banana + lactose-free skyr 150 g (60-90 min before; low-fat, low-fibre)', protein:15},
      {time:'Lunch', text:'Chicken breast 160 g, rice 180 g cooked, steamed green beans and carrots 200 g, olive oil 10 ml', protein:45},
      {time:'Post-training', text:'Lactose-free whey isolate (or egg-white protein) 35 g + 3 rice cakes', protein:30},
      {time:'Dinner', text:'Lean beef steak 150 g, potatoes 250 g, beetroot-tomato-leaf salad, olive oil 8 ml', protein:35},
      {time:'Evening', text:'Lactose-free quark 150 g + 2 kiwifruit', protein:18},
    ]},
    wednesday: { type:'rest', totals:{kcal:1850,protein:155,carbs:150,fat:62,fibre:30}, meals:[
      {time:'Breakfast', text:'3-egg omelette with spinach and tomato; 1 slice certified GF oat-free bread', protein:22},
      {time:'Lunch', text:'Tinned tuna in water 140 g, quinoa 150 g cooked, salad of leaves, cucumber and grated beetroot, olive oil 10 ml', protein:38},
      {time:'Snack', text:'Lactose-free whey isolate (or egg-white protein) 30 g, 1 apple, almonds 15 g', protein:28},
      {time:'Dinner', text:'Cod 200 g, sweet potato 200 g (skin on), steamed spinach and courgette 200 g, olive oil 8 ml', protein:40},
      {time:'Evening', text:'Lactose-free skyr 200 g + 2 kiwifruit', protein:24},
    ]},
    thursday: { type:'training', totals:{kcal:2100,protein:160,carbs:215,fat:60,fibre:32}, meals:[
      {time:'Breakfast', text:'Chia pudding: chia 25 g, lactose-free milk 250 ml (or soy), 1/2 scoop whey isolate, berries 100 g', protein:25},
      {time:'Pre-training', text:'1 banana', protein:1},
      {time:'Lunch', text:'Turkey breast 160 g, certified GF pasta 150 g cooked, tomato sauce with courgette and grated carrot 150 g', protein:45},
      {time:'Post-training', text:'Lactose-free whey isolate (or egg-white protein) 35 g + 3 rice cakes', protein:30},
      {time:'Dinner', text:'Salmon 150 g, rice 180 g cooked, well-cooked broccoli 200 g (soft, not raw)', protein:37},
      {time:'Evening', text:'Lactose-free quark 150 g + 1 kiwifruit', protein:18},
    ]},
    friday: { type:'rest', totals:{kcal:1850,protein:155,carbs:150,fat:62,fibre:30}, meals:[
      {time:'Breakfast', text:'Bowl: lactose-free Greek yoghurt 250 g, chia 15 g, quinoa flakes 40 g, berries 100 g', protein:30},
      {time:'Lunch', text:'Prawn stir-fry: prawns 180 g, courgette, carrot and pak choi 200 g, tamari (certified GF), rice 120 g cooked', protein:36},
      {time:'Snack', text:'Lactose-free whey isolate (or egg-white protein) 30 g, 1 pear (skin on), walnuts 15 g', protein:28},
      {time:'Dinner', text:'Skinless chicken thigh 150 g, polenta 200 g cooked, salad with artichoke hearts and tomato, olive oil 8 ml', protein:35},
      {time:'Evening', text:'2 boiled eggs + lactose-free skyr 100 g + 1 kiwifruit', protein:22},
    ]},
    saturday: { type:'training', totals:{kcal:2100,protein:165,carbs:215,fat:60,fibre:32}, meals:[
      {time:'Breakfast', text:'3-egg omelette, 2 corn tortillas (certified GF), tomato and avocado 50 g', protein:24},
      {time:'Pre-training', text:'1 banana + lactose-free skyr 150 g', protein:15},
      {time:'Lunch', text:'Lean beef 150 g, potatoes 280 g, steamed carrots and green beans 200 g, olive oil 8 ml', protein:35},
      {time:'Post-training', text:'Lactose-free whey isolate (or egg-white protein) 35 g + 3 rice cakes', protein:30},
      {time:'Dinner', text:'White fish 200 g, quinoa 180 g cooked, roasted pumpkin and courgette 200 g', protein:42},
      {time:'Evening', text:'Lactose-free skyr 170 g + 1 kiwifruit', protein:20},
    ]},
    sunday: { type:'low-appetite', note:'Injection evening', totals:{kcal:1600,protein:140,carbs:140,fat:50,fibre:24}, meals:[
      {time:'Morning', text:'Smoothie: lactose-free whey isolate (or egg-white protein) 30 g, lactose-free milk 250 ml (or soy), strawberries 150 g, 1/2 banana', protein:35},
      {time:'Midday', text:'3 scrambled eggs + mashed potato 150 g (made with lactose-free milk)', protein:20},
      {time:'Afternoon', text:'Lactose-free yoghurt 200 g + honey 10 g', protein:20},
      {time:'Early dinner', text:'Blended red-lentil and chicken soup ~400 ml (chicken 120 g, carrot, spinach)', protein:35},
      {time:'Evening', text:'Half shake (lactose-free whey isolate, or egg-white protein, 25 g); psyllium 5 g in water', protein:22},
    ]},
  },
  2: {
    monday: { type:'low-appetite', totals:{kcal:1600,protein:145,carbs:140,fat:50,fibre:25}, meals:[
      {time:'Morning', text:'Smoothie: lactose-free whey isolate (or egg-white protein) 30 g, lactose-free milk 250 ml (or soy), mango 100 g', protein:35},
      {time:'Midday', text:'3 scrambled eggs, white rice 150 g cooked', protein:22},
      {time:'Afternoon', text:'Lactose-free skyr 170 g + honey 10 g', protein:25},
      {time:'Early dinner', text:'Blended turkey-rice soup ~400 ml (turkey 120 g, carrot, courgette)', protein:35},
      {time:'Evening', text:'Lactose-free yoghurt 200 g; psyllium 5 g in water', protein:20},
    ]},
    tuesday: { type:'training', totals:{kcal:2100,protein:165,carbs:215,fat:60,fibre:33}, meals:[
      {time:'Breakfast', text:'Buckwheat porridge: buckwheat flakes 50 g, lactose-free milk 250 ml (or soy), 1/2 scoop whey isolate, berries', protein:25},
      {time:'Pre-training', text:'1 banana + lactose-free skyr 150 g', protein:15},
      {time:'Lunch', text:'Chicken breast 160 g, sweet potato 250 g (skin on), steamed green beans and beetroot 200 g, olive oil 8 ml', protein:45},
      {time:'Post-training', text:'Lactose-free whey isolate (or egg-white protein) 35 g + 3 rice cakes', protein:30},
      {time:'Dinner', text:'Beef strip stir-fry 150 g, rice 180 g cooked, well-cooked broccoli and peppers 200 g, tamari (certified GF)', protein:35},
      {time:'Evening', text:'Lactose-free quark 150 g + 2 kiwifruit', protein:18},
    ]},
    wednesday: { type:'rest', totals:{kcal:1850,protein:150,carbs:150,fat:62,fibre:30}, meals:[
      {time:'Breakfast', text:'Bowl: lactose-free Greek yoghurt 250 g, chia 15 g, quinoa flakes 40 g, berries 100 g', protein:30},
      {time:'Lunch', text:'Tinned sardines 120 g (bones in), potato salad 200 g (olive oil, herbs), steamed chard or spinach 150 g', protein:30},
      {time:'Snack', text:'Lactose-free whey isolate (or egg-white protein) 30 g, 1 orange, almonds 15 g', protein:28},
      {time:'Dinner', text:'Chicken breast 160 g, buckwheat 180 g cooked, roasted pumpkin, beetroot and courgette 200 g', protein:45},
      {time:'Evening', text:'2 boiled eggs + 2 kiwifruit', protein:13},
    ]},
    thursday: { type:'training', totals:{kcal:2100,protein:170,carbs:215,fat:60,fibre:32}, meals:[
      {time:'Breakfast', text:'3-egg omelette, 2 corn tortillas (certified GF), tomato', protein:24},
      {time:'Pre-training', text:'1 banana + lactose-free skyr 150 g', protein:15},
      {time:'Lunch', text:'Salmon 150 g, rice 180 g cooked, steamed courgette and carrots 200 g', protein:37},
      {time:'Post-training', text:'Lactose-free whey isolate (or egg-white protein) 35 g + 3 rice cakes', protein:30},
      {time:'Dinner', text:'Turkey breast 160 g, certified GF pasta 150 g cooked, tomato sauce with spinach and courgette', protein:45},
      {time:'Evening', text:'Lactose-free skyr 170 g', protein:20},
    ]},
    friday: { type:'rest', totals:{kcal:1850,protein:150,carbs:150,fat:62,fibre:30}, meals:[
      {time:'Breakfast', text:'Chia pudding: chia 25 g, lactose-free milk 250 ml (or soy), 1/2 scoop whey isolate, berries', protein:25},
      {time:'Lunch', text:'Chicken salad: breast 150 g, avocado 50 g, quinoa 150 g cooked, leaves, grated carrot and beetroot', protein:42},
      {time:'Snack', text:'Lactose-free whey isolate (or egg-white protein) 30 g + 1 apple (skin on)', protein:26},
      {time:'Dinner', text:'Prawns 180 g, polenta 200 g cooked, okra or green beans with spinach 200 g, olive oil 8 ml', protein:36},
      {time:'Evening', text:'Lactose-free quark 150 g + 2 kiwifruit', protein:18},
    ]},
    saturday: { type:'training', totals:{kcal:2100,protein:160,carbs:215,fat:60,fibre:32}, meals:[
      {time:'Breakfast', text:'Bowl: lactose-free Greek yoghurt 250 g, chia 15 g, buckwheat flakes 40 g, berries 100 g', protein:30},
      {time:'Pre-training', text:'1 banana', protein:1},
      {time:'Lunch', text:'Lean beef 150 g, potatoes 280 g, steamed broccoli and carrots 200 g (broccoli well cooked), olive oil 8 ml', protein:35},
      {time:'Post-training', text:'Lactose-free whey isolate (or egg-white protein) 35 g + 3 rice cakes', protein:30},
      {time:'Dinner', text:'Cod 200 g, rice 180 g cooked, roasted pumpkin and green beans 200 g', protein:40},
      {time:'Evening', text:'Lactose-free skyr 170 g + 1 kiwifruit', protein:20},
    ]},
    sunday: { type:'low-appetite', note:'Injection evening', totals:{kcal:1600,protein:145,carbs:140,fat:50,fibre:24}, meals:[
      {time:'Morning', text:'Smoothie: lactose-free whey isolate (or egg-white protein) 30 g, lactose-free milk 250 ml (or soy), blueberries 100 g, peanut butter 10 g', protein:38},
      {time:'Midday', text:'3 scrambled eggs, white rice 150 g cooked', protein:22},
      {time:'Afternoon', text:'Lactose-free yoghurt 200 g + honey 10 g', protein:20},
      {time:'Early dinner', text:'Blended chicken-vegetable soup ~400 ml (chicken 120 g, courgette, carrot, spinach)', protein:35},
      {time:'Evening', text:'Half shake (lactose-free whey isolate, or egg-white protein, 25 g); psyllium 5 g in water', protein:22},
    ]},
  },
};

const TRAINING_DAYS = {
  monday: { title:'Lower A (quad emphasis)', workSets:19, rest:false, exercises:[
    {name:'Barbell back squat', sets:'4 x 5-8', rest:'2.5-3 min', notes:'Top priority of the week. High-bar or whatever depth your mobility allows; 2-3 reps in reserve (RIR) in week 1.'},
    {name:'Romanian deadlift', sets:'3 x 8-10', rest:'2 min', notes:'Hinge, soft knees, bar close; stretch the hamstrings, do not touch the floor.'},
    {name:'Leg press', sets:'3 x 10-12', rest:'90 s', notes:'Feet mid-platform; full controlled depth, no locked-knee bouncing.'},
    {name:'Dumbbell walking lunge', sets:'2 x 10-12 /leg', rest:'90 s', notes:'Long steps for glutes; if balance limits load, do split squats instead.'},
    {name:'Standing calf raise', sets:'4 x 10-15', rest:'60 s', notes:'2 s pause at the bottom stretch - this is what makes calves grow.'},
    {name:'Hanging knee raise', sets:'3 x 10-15', rest:'60 s', notes:"Superset with calves to save time; curl the pelvis, don't just lift the knees."},
  ]},
  tuesday: { title:'Push (chest, shoulders, triceps)', workSets:18, rest:false, exercises:[
    {name:'Barbell bench press', sets:'4 x 6-8', rest:'2.5-3 min', notes:'Shoulder blades pinned, feet planted, bar to lower chest; 2 RIR.'},
    {name:'Seated dumbbell shoulder press', sets:'3 x 8-10', rest:'2 min', notes:'Back support, elbows slightly forward, full lockout.'},
    {name:'Incline dumbbell press', sets:'3 x 8-12', rest:'90 s', notes:'30-45 degree bench; deep stretch at the bottom.'},
    {name:'Dumbbell lateral raise', sets:'3 x 12-15', rest:'60 s', notes:'Lean slightly forward, lead with elbows, no swinging.'},
    {name:'Overhead cable/DB triceps extension', sets:'3 x 10-12', rest:'60 s', notes:'Long-head emphasis; full stretch behind the head.'},
    {name:'Cable triceps pushdown', sets:'2 x 12-15', rest:'60 s', notes:'Superset with lateral raises if short on time.'},
  ]},
  wednesday: { title:'Pull (back, rear delts, biceps)', workSets:18, rest:false, exercises:[
    {name:'Lat pulldown (or pull-ups if able)', sets:'4 x 6-10', rest:'2-2.5 min', notes:'Slight lean back, pull to upper chest, control the negative.'},
    {name:'Chest-supported row (or barbell row)', sets:'4 x 8-10', rest:'2 min', notes:'Chest-supported preferred - protects the lower back on deficit fatigue days.'},
    {name:'Seated cable row', sets:'3 x 10-12', rest:'90 s', notes:'Squeeze shoulder blades, pause 1 s at the chest.'},
    {name:'Face pull', sets:'3 x 12-15', rest:'60 s', notes:'Rope to eyebrows, external rotation at the end; shoulder health insurance.'},
    {name:'EZ-bar curl', sets:'3 x 8-12', rest:'60 s', notes:'Strict; elbows pinned at sides.'},
    {name:'Incline dumbbell curl', sets:'2 x 12-15', rest:'60 s', notes:'Long-head stretch; superset with face pulls if pressed for time.'},
  ]},
  thursday: { title:'Rest', rest:true },
  friday: { title:'Lower B (posterior chain)', workSets:19, rest:false, exercises:[
    {name:'Deadlift (conventional or trap bar)', sets:'3 x 4-6', rest:'3 min', notes:'Heaviest lift of the week; never to failure, always 2+ RIR. Trap bar if lower back is a concern.'},
    {name:'Bulgarian split squat', sets:'3 x 8-10 /leg', rest:'2 min', notes:'Rear foot on bench, dumbbells in hand; brutal but the single best leg builder on a 60-min clock.'},
    {name:'Lying or seated leg curl', sets:'3 x 10-12', rest:'90 s', notes:"Hamstrings need direct knee-flexion work RDLs don't give."},
    {name:'Barbell hip thrust', sets:'3 x 8-12', rest:'90 s', notes:'Chin tucked, full lockout squeeze 1 s.'},
    {name:'Seated calf raise', sets:'4 x 12-15', rest:'60 s', notes:'Soleus focus; pause at stretch.'},
    {name:'Cable crunch', sets:'3 x 12-15', rest:'60 s', notes:"Superset with calves; flex the spine, don't pull with the arms."},
  ]},
  saturday: { title:'Upper (weak points + arms)', workSets:18, rest:false, exercises:[
    {name:'Incline barbell press', sets:'3 x 6-10', rest:'2.5 min', notes:'Upper chest priority; touch high on the chest.'},
    {name:'One-arm dumbbell row', sets:'3 x 8-12', rest:'90 s', notes:'Knee and hand on bench; pull to the hip, full stretch at the bottom.'},
    {name:'Dumbbell lateral raise (2nd weekly hit)', sets:'3 x 15-20', rest:'60 s', notes:'Lighter, higher reps than Tuesday; delts respond to frequency.'},
    {name:'Close-grip lat pulldown', sets:'3 x 10-12', rest:'90 s', notes:'Neutral grip; elbows to ribs.'},
    {name:'Superset: DB hammer curl + lying triceps extension', sets:'3 x 10-12 each', rest:'60 s after pair', notes:'Back-to-back, no rest inside the pair.'},
    {name:'Reverse pec-deck / bent-over rear delt fly', sets:'2 x 15-20', rest:'60 s', notes:'Rear delts round out the shoulder; light and strict.'},
  ]},
  sunday: { title:'Rest + injection evening', rest:true },
};

const WEEK_PROGRESSION = {
  1: 'Week 1 - Calibrate: all lifts at 3 RIR. Deliberately submaximal; find correct weights and groove technique.',
  2: 'Week 2 - Load the pattern: 2 RIR everywhere; push reps.',
  3: 'Week 3 - Peak effort: 1-2 RIR on the last set of each exercise (compounds keep 2 RIR); the hardest week.',
  4: "Week 4 - Autoregulate: repeat week 3's effort if lifts are climbing and recovery is good. If bar speed drops, sleep is poor, or two lifts regressed - deload: same weights, two-thirds of the sets, 3 RIR.",
};

const WARMUP_TEXT = '3-5 min easy cardio, then dynamic prep (leg swings, bodyweight squats, hip openers, band pull-aparts, arm circles, cat-camel), then ramp-up sets on the first compound lift only.';
const COOLDOWN_TEXT = '3-4 min easy walk/bike, 30 s stretch per muscle trained, 5 slow nasal breaths, then the post-training shake within the hour.';
const CARDIO_TEXT = '8-10k steps daily plus a 10-15 min walk after your two biggest meals. Optional 1-2 x 20-30 min incline-walk or bike, low intensity, on Thursday/Sunday. No HIIT - it competes with leg recovery.';
const OPTIONAL_LIGHT_TEXT = 'Leg press 3x12 light, lat pulldown 3x12, machine chest press 3x12, lateral raise 2x15, 10 min incline walk. ~30 min, RPE 6 - keeps the muscle-retention signal alive on a bad day.';

function tbl(header1, header2, header3, rows) {
  return { isTable:true, header1, header2, header3, hasCol3: !!header3, rows };
}

const REFERENCE_SECTIONS = [
  { id:'safety', title:'Safety rules', isText:true, paragraphs:[
    'Strictly gluten-free with cross-contamination care; zero oats in any form - including certified GF oats, oat flour and oat milk. Check GF breads, granolas, bars and protein powders, where oat flour hides.',
    'Lactose-free throughout (lactose-free dairy allowed). Items marked as dairy-free swaps are for a milk-protein allergy rather than lactose intolerance.',
    'Verify certification on every packaged product: yoghurts, whey, tamari, corn tortillas, GF pasta and bread, stock cubes, rice cakes, tinned goods.',
    'Swap any food for another in the same table at the portion listed - portions are matched so protein, carb and fat stay roughly equal. Never swap a protein for a carb. Keep every meal at 35-40 g protein minimum (30 g on low-appetite days, 4-5 feedings).',
  ]},
  { id:'veg', title:'Vegetable guide', ...tbl('Tier','Vegetables','How to use',[
    {col1:'Tier 1 - daily', col2:'Carrots, courgette, pumpkin/butternut squash, green beans, beetroot, cooked spinach, chard, okra, artichoke hearts, pak choi', col3:'2+ portions/day, mostly cooked - moves the bowel without bloating'},
    {col1:'Tier 2 - gas-forming', col2:'Broccoli, cauliflower, Brussels sprouts, cabbage, leeks, onions, peas', col3:'Max 1 portion/day, always well cooked, never raw; skip on low-appetite days'},
    {col1:'Tier 3 - hydration', col2:'Cucumber, lettuce, tomato, peppers, celery', col3:"Use freely for salads and satiety; doesn't count toward fibre goals"},
    {col1:'Non-veg heavy hitters', col2:'2 kiwifruit/day, prunes 3-4, pear or apple with skin, chia 15 g, psyllium 5-10 g, cooked lentils/beans', col3:'Kiwifruit and psyllium are the best-evidenced daily tools; add 3-4 prunes on a day with no bowel movement'},
  ])},
  { id:'protein', title:'Protein swaps (~35 g each)', ...tbl('Food','Portion','Notes',[
    {col1:'Chicken or turkey breast', col2:'150 g', col3:'Leanest; default choice'},
    {col1:'Lean beef (steak, 5% mince)', col2:'160 g', col3:'2-3x/week for iron and zinc'},
    {col1:'Salmon', col2:'170 g', col3:'2x/week for omega-3; counts as protein + 1 fat portion'},
    {col1:'Cod / white fish', col2:'200 g', col3:'Very lean, light - good on queasy days'},
    {col1:'Prawns', col2:'180 g', col3:'Very lean'},
    {col1:'Tinned tuna in water', col2:'140 g drained', col3:'Check plain, no sauces'},
    {col1:'Tinned sardines (bones in)', col2:'140 g', col3:'Calcium bonus'},
    {col1:'Whole eggs', col2:'5 eggs', col3:'Counts as protein + 1.5 fat portions'},
    {col1:'Firm tofu (dairy-free)', col2:'250 g', col3:'Choose calcium-set; larger portion (lower leucine)'},
    {col1:'Lactose-free whey isolate', col2:'40 g', col3:'Dairy-free swap: egg-white protein 40 g; verify GF, no oat additives'},
    {col1:'Lactose-free skyr', col2:'350 g', col3:'Only as a meal replacement, not a topping'},
  ])},
  { id:'carb', title:'Carbohydrate swaps (~45 g each)', ...tbl('Food','Portion','Notes',[
    {col1:'White or brown rice', col2:'150 g cooked', col3:'Safest staple; white rice best on nausea days'},
    {col1:'Quinoa', col2:'200 g cooked', col3:'Adds ~8 g protein and iron/magnesium'},
    {col1:'Potato', col2:'280 g', col3:'Very satiating; mashed with LF milk on low-appetite days'},
    {col1:'Sweet potato', col2:'220 g', col3:'Higher fibre - eat the skin'},
    {col1:'Buckwheat groats', col2:'200 g cooked', col3:'Magnesium-rich; no wheat despite the name'},
    {col1:'Certified GF pasta (corn/rice)', col2:'130 g cooked', col3:'Check label for oat or lupin flour'},
    {col1:'Corn tortillas (certified GF)', col2:'3 small', col3:'Check pure corn, no wheat starch'},
    {col1:'Polenta', col2:'200 g cooked', col3:'Soft texture - good on low-appetite days'},
    {col1:'Certified GF oat-free bread', col2:'2 slices', col3:'HIGH RISK for hidden oat flour - read every label'},
    {col1:'Rice cakes', col2:'5', col3:'Post-training with shake'},
    {col1:'Fruit', col2:'1 banana + 1 apple', col3:'Use for snacks, not main-meal carb'},
  ])},
  { id:'fat', title:'Fat swaps (~10 g each)', ...tbl('Food','Portion','Notes',[
    {col1:'Olive oil', col2:'10 ml', col3:'Default cooking/dressing fat; stimulates gut motility'},
    {col1:'Avocado', col2:'60 g', col3:''},
    {col1:'Almonds or walnuts', col2:'15 g', col3:''},
    {col1:'Peanut butter', col2:'15 g', col3:'Check certified GF'},
    {col1:'Tahini', col2:'15 g', col3:'Calcium bonus; check certified GF'},
  ])},
  { id:'breakfast', title:'Breakfast base swaps', isList:true, items:[
    'Lactose-free Greek yoghurt 250 g',
    'Lactose-free skyr 200 g',
    'Soy yoghurt 250 g + 1/2 scoop protein (dairy-free)',
    '3-egg omelette',
    'Chia pudding with 1/2 scoop whey isolate',
    'Smoothie with 30 g whey isolate - best on low-appetite mornings',
  ]},
  { id:'dairy', title:'Dairy & lactose swaps', ...tbl('Instead of','Lactose-free option','Dairy-free option',[
    {col1:'Milk', col2:'Lactose-free milk', col3:'Calcium-fortified soy milk (never oat milk)'},
    {col1:'Greek yoghurt / skyr', col2:'Lactose-free versions', col3:'Soy yoghurt + protein powder top-up'},
    {col1:'Cottage cheese / quark', col2:'Lactose-free quark', col3:'2 eggs + edamame 50 g, or silken tofu'},
    {col1:'Cheese', col2:'Aged parmesan / aged cheddar (near-zero lactose)', col3:'Omit; use nutritional yeast for flavour'},
    {col1:'Whey concentrate / casein', col2:'Lactose-free whey isolate', col3:'Egg-white or pea+rice protein'},
  ])},
  { id:'pantry', title:'Pantry & flavour swaps', ...tbl('Never use','Always use instead', null, [
    {col1:'Soy sauce', col2:'Tamari, certified GF'},
    {col1:'Any oats (flakes, flour, milk, granola - even certified GF)', col2:'Buckwheat or quinoa flakes; rice- or soy-based alternatives'},
    {col1:'Couscous, bulgur, barley, spelt, semolina', col2:'Quinoa, rice, buckwheat, polenta'},
    {col1:'Regular stock cubes, spice blends, malt vinegar', col2:'Certified GF stock and single spices; wine or cider vinegar'},
    {col1:'Breaded/floured products, regular baking flour', col2:'Certified GF flour blends (check oat-free)'},
  ])},
  { id:'lowapp', title:'Low-appetite override', isText:true, paragraphs:[
    'If nausea or fullness hits on a normal day, swap any main meal for: a smoothie (whey isolate 30 g + lactose-free or soy milk + fruit), a blended soup with 120 g chicken/turkey and Tier-1 vegetables, or 3 eggs + a small soft carb. Protect the protein - the vegetables and carbs can shrink for a day or two.',
  ]},
  { id:'nonneg', title:'Weekly non-negotiables', isList:true, items:[
    'Oily fish 2x/week',
    'Red meat 2-3x/week (iron/zinc)',
    'Sardines, tahini or calcium-set tofu at least 2x/week (calcium)',
    '2+ Tier-1 vegetable portions every day',
    '2 kiwifruit most evenings, psyllium daily (constipation)',
    '2.5-3 L fluids daily',
    'Creatine 3-5 g daily, if adopted',
  ]},
  { id:'warmup', title:'Warm-up & cool-down', isText:true, paragraphs:[ 'Warm-up (8-10 min): ' + WARMUP_TEXT, 'Cool-down (5 min): ' + COOLDOWN_TEXT ]},
  { id:'cardio', title:'Cardio & optional light session', isText:true, paragraphs:[ CARDIO_TEXT, 'Optional light session (nausea/low-energy fallback): ' + OPTIONAL_LIGHT_TEXT ]},
];

/* ── state & persistence ────────────────────────────────────────────────── */

const state = {
  tab: DEFAULT_TAB,
  week: 1,
  day: null,                 // weekday key when a day is open
  doneMeals: load('mtapp-done-meals', {}),
  doneEx: load('mtapp-done-ex', {}),
  openVideo: {},
  openRef: { safety: true },
  weightLog: load('mtapp-weight-log', []),
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
}
function persist(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}

/* ── rendering ──────────────────────────────────────────────────────────── */

const headerEl = document.getElementById('header');
const contentEl = document.getElementById('content');

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

const ICONS = {
  back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>',
  chevRight: '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>',
  chevDown: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>',
  checkMeal: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
  checkEx: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
  play: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
  trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path></svg>',
};

function mealWeekNum() { return state.week % 2 === 1 ? 1 : 2; }

function render() {
  if (state.day) {
    renderDayHeader();
    renderDayContent();
  } else if (state.tab === 'week') {
    renderWeekHeader();
    renderWeekContent();
  } else if (state.tab === 'reference') {
    headerEl.innerHTML = '<div class="app-header hdr-tab"><h1>Reference</h1><p class="hdr-sub">Safety rules, swaps &amp; guides</p></div>';
    renderReferenceContent();
  } else {
    headerEl.innerHTML = '<div class="app-header hdr-tab"><h1>Progress</h1><p class="hdr-sub">Weight &amp; notes log</p></div>';
    renderProgressContent();
  }
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const t = btn.dataset.tab;
    btn.classList.toggle('active', t === state.tab || (t === 'week' && !!state.day));
  });
}

/* — week tab — */

function renderWeekHeader() {
  const chips = [1,2,3,4].map(n =>
    `<button class="chip${n === state.week ? ' active' : ''}" data-action="set-week" data-week="${n}">Week ${n}</button>`
  ).join('');
  headerEl.innerHTML = `
    <div class="app-header hdr-tab">
      <h1 class="hdr-week">Joao's Plan</h1>
      <p class="hdr-sub hdr-sub-week">4-week meal + training reference</p>
      <div class="week-chips">${chips}</div>
    </div>`;
}

function renderWeekContent() {
  const rows = WEEKDAYS.map(key => {
    const mealDay = MEAL_WEEKS[mealWeekNum()][key];
    const trainDay = TRAINING_DAYS[key];
    const typeLabel = trainDay.rest ? 'Rest' : 'Training';
    const typeClass = trainDay.rest ? 'tag-accent-2' : 'tag-accent';
    const workoutTitle = trainDay.rest ? 'Rest - optional light cardio' : trainDay.title;
    const mealTag = mealDay.type === 'low-appetite'
      ? '<span class="tag tag-neutral">Low-appetite menu</span>' : '';
    return `
      <button class="day-row" data-action="open-day" data-day="${key}">
        <div class="day-abbr">${DAY_META[key].abbr}</div>
        <div class="day-main">
          <div class="day-title">${esc(workoutTitle)}</div>
          <div class="day-tags"><span class="tag ${typeClass}">${typeLabel}</span>${mealTag}</div>
        </div>
        ${ICONS.chevRight}
      </button>`;
  }).join('');
  contentEl.innerHTML = `<div class="stack-10">${rows}</div>`;
}

/* — day detail — */

function renderDayHeader() {
  const day = state.day;
  const mealDay = MEAL_WEEKS[mealWeekNum()][day];
  const trainDay = TRAINING_DAYS[day];
  const note = mealDay.note ? `<span class="type-note">${esc(mealDay.note)}</span>` : '';
  headerEl.innerHTML = `
    <div class="app-header hdr-day">
      <button class="back-btn" data-action="close-day">${ICONS.back} Week ${state.week}</button>
      <h2>${DAY_META[day].full}</h2>
      <div class="day-tagrow">
        <span class="tag tag-accent">${trainDay.rest ? 'Rest day' : 'Training day'}</span>${note}
      </div>
    </div>`;
}

function mealCheckKey(idx) { return `${state.week}-${state.day}-meal-${idx}`; }
function exCheckKey(idx) { return `${state.week}-${state.day}-ex-${idx}`; }
function videoKey(idx) { return `${state.day}-ex-${idx}`; }

function renderDayContent() {
  const day = state.day;
  const mealDay = MEAL_WEEKS[mealWeekNum()][day];
  const trainDay = TRAINING_DAYS[day];
  const t = mealDay.totals;

  const mealTypeLabel = mealDay.type === 'training' ? 'Training-day menu'
    : mealDay.type === 'rest' ? 'Rest-day menu' : 'Low-appetite menu';

  const mealRows = mealDay.meals.map((m, idx) => `
    <div class="meal-row">
      <button class="check-btn" data-action="toggle-meal" data-idx="${idx}" aria-label="Mark ${esc(m.time)} done">${state.doneMeals[mealCheckKey(idx)] ? ICONS.checkMeal : ''}</button>
      <div class="meal-main">
        <div class="meal-time">${esc(m.time)}</div>
        <div class="meal-text">${esc(m.text)}</div>
      </div>
      <span class="tag tag-accent-2">${m.protein}g</span>
    </div>`).join('');

  let trainingBody;
  if (trainDay.rest) {
    trainingBody = `
      <p class="rest-text">${esc(CARDIO_TEXT)}</p>
      <p class="rest-text"><strong>Optional light session:</strong> ${esc(OPTIONAL_LIGHT_TEXT)}</p>`;
  } else {
    const exRows = trainDay.exercises.map((ex, idx) => {
      const query = encodeURIComponent(ex.name + ' technique');
      const videoOpen = !!state.openVideo[videoKey(idx)];
      const watch = VIDEO_MODE === 'inline'
        ? `<button class="watch-btn" data-action="toggle-video" data-idx="${idx}">${ICONS.play} Watch technique</button>
           ${videoOpen ? `<div class="video-wrap"><iframe src="https://www.youtube.com/embed?listType=search&amp;list=${query}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` : ''}`
        : `<a class="watch-btn" href="https://www.youtube.com/results?search_query=${query}" target="_blank" rel="noopener">${ICONS.play} Watch technique</a>`;
      return `
        <div class="ex-row">
          <div class="ex-head">
            <div class="ex-main">
              <div class="ex-name">${esc(ex.name)}</div>
              <div class="ex-sets">${esc(ex.sets)} &middot; rest ${esc(ex.rest)}</div>
            </div>
            <button class="check-btn" data-action="toggle-ex" data-idx="${idx}" aria-label="Mark ${esc(ex.name)} done">${state.doneEx[exCheckKey(idx)] ? ICONS.checkEx : ''}</button>
          </div>
          <p class="ex-notes">${esc(ex.notes)}</p>
          ${watch}
        </div>`;
    }).join('');
    trainingBody = `
      <div class="worksets-row"><span class="tag tag-accent">${trainDay.workSets} work sets</span></div>
      <p class="progression">${esc(WEEK_PROGRESSION[state.week])}</p>
      <p class="warmup"><strong>Warm-up:</strong> ${esc(WARMUP_TEXT)}</p>
      ${exRows}
      <p class="cooldown"><strong>Cool-down:</strong> ${esc(COOLDOWN_TEXT)}</p>`;
  }

  contentEl.innerHTML = `
    <div class="stack-16">
      <p class="rotation-note">Following Week ${mealWeekNum()} menu (2-week meal rotation)</p>
      <div class="card elev-sm pad-card">
        <div class="card-head">
          <div class="card-title">Meals</div>
          <span class="tag tag-accent-2">${mealTypeLabel}</span>
        </div>
        <div class="totals">
          <span class="tag tag-neutral">~${t.kcal} kcal</span>
          <span class="tag tag-neutral">${t.protein} g protein</span>
          <span class="tag tag-neutral">${t.carbs} g carbs</span>
          <span class="tag tag-neutral">${t.fat} g fat</span>
          <span class="tag tag-neutral">${t.fibre} g fibre</span>
        </div>
        ${mealRows}
      </div>
      <div class="card elev-sm pad-card">
        <div class="card-title">${esc(trainDay.title)}</div>
        ${trainingBody}
      </div>
    </div>`;
}

/* — reference tab — */

function renderReferenceContent() {
  const cards = REFERENCE_SECTIONS.map(sec => {
    const open = !!state.openRef[sec.id];
    let body = '';
    if (open) {
      if (sec.isText) {
        body = sec.paragraphs.map(p => `<p>${esc(p)}</p>`).join('');
      } else if (sec.isList) {
        body = `<ul>${sec.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul>`;
      } else if (sec.isTable) {
        const head = `<tr><th>${esc(sec.header1)}</th><th>${esc(sec.header2)}</th>${sec.hasCol3 ? `<th>${esc(sec.header3)}</th>` : ''}</tr>`;
        const rows = sec.rows.map(r =>
          `<tr><td>${esc(r.col1)}</td><td>${esc(r.col2)}</td>${sec.hasCol3 ? `<td>${esc(r.col3 ?? '')}</td>` : ''}</tr>`
        ).join('');
        body = `<table class="table"><thead>${head}</thead><tbody>${rows}</tbody></table>`;
      }
      body = `<div class="ref-body">${body}</div>`;
    }
    return `
      <div class="card elev-sm ref-card">
        <button class="ref-toggle${open ? ' open' : ''}" data-action="toggle-ref" data-ref="${sec.id}">
          <span>${esc(sec.title)}</span>
          ${ICONS.chevDown}
        </button>
        ${body}
      </div>`;
  }).join('');
  contentEl.innerHTML = `<div class="stack-10">${cards}</div>`;
}

/* — progress tab — */

function renderProgressContent() {
  const entries = state.weightLog.map(w => `
    <div class="card elev-sm log-card">
      <div class="log-main">
        <div class="log-weight">${esc(w.weight)} ${esc(w.unit)}</div>
        <div class="log-date">${esc(w.date)}</div>
        ${w.note ? `<div class="log-note">${esc(w.note)}</div>` : ''}
      </div>
      <button class="del-btn" data-action="delete-weight" data-id="${w.id}" aria-label="Delete entry">${ICONS.trash}</button>
    </div>`).join('');

  contentEl.innerHTML = `
    <div class="stack-16">
      <div class="card elev-sm form-card">
        <div class="card-title">Log an entry</div>
        <div class="field"><label for="p-date">Date</label><input class="input" id="p-date" type="date"></div>
        <div class="field"><label for="p-weight">Weight (${WEIGHT_UNIT})</label><input class="input" id="p-weight" type="number" step="0.1" placeholder="e.g. 84.2"></div>
        <div class="field"><label for="p-note">Note (optional)</label><input class="input" id="p-note" type="text" placeholder="e.g. energy good, low appetite"></div>
        <button class="btn btn-primary btn-block" data-action="add-weight">Add entry</button>
      </div>
      <div class="stack-8">
        ${state.weightLog.length === 0 ? '<p class="empty-log">No entries yet. Log your first weigh-in above.</p>' : entries}
      </div>
    </div>`;
}

/* ── actions ────────────────────────────────────────────────────────────── */

function addWeight() {
  const weightInput = document.getElementById('p-weight');
  const dateInput = document.getElementById('p-date');
  const noteInput = document.getElementById('p-note');
  if (!weightInput.value) return;
  const entry = {
    id: Date.now(),
    date: dateInput.value || new Date().toISOString().slice(0, 10),
    weight: weightInput.value,
    note: noteInput.value,
    unit: WEIGHT_UNIT,
  };
  state.weightLog = [entry, ...state.weightLog];
  persist('mtapp-weight-log', state.weightLog);
  const keepDate = dateInput.value;
  renderProgressContent();
  document.getElementById('p-date').value = keepDate;
}

/* In-place toggles keep scroll position and any open video untouched. */
function toggleCheck(btn, storeKey, checkKey, icon) {
  state[storeKey][checkKey] = !state[storeKey][checkKey];
  persist(storeKey === 'doneMeals' ? 'mtapp-done-meals' : 'mtapp-done-ex', state[storeKey]);
  btn.innerHTML = state[storeKey][checkKey] ? icon : '';
}

function toggleVideo(btn, idx) {
  const key = videoKey(idx);
  state.openVideo[key] = !state.openVideo[key];
  const existing = btn.nextElementSibling;
  if (existing && existing.classList.contains('video-wrap')) existing.remove();
  if (state.openVideo[key]) {
    const query = encodeURIComponent(TRAINING_DAYS[state.day].exercises[idx].name + ' technique');
    const wrap = document.createElement('div');
    wrap.className = 'video-wrap';
    wrap.innerHTML = `<iframe src="https://www.youtube.com/embed?listType=search&list=${query}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    btn.after(wrap);
  }
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const scroll = contentEl.scrollTop;
  switch (el.dataset.action) {
    case 'set-tab':
      state.tab = el.dataset.tab;
      state.day = null;
      render();
      contentEl.scrollTop = 0;
      break;
    case 'set-week':
      state.week = Number(el.dataset.week);
      render();
      contentEl.scrollTop = scroll;
      break;
    case 'open-day':
      state.day = el.dataset.day;
      render();
      contentEl.scrollTop = 0;
      break;
    case 'close-day':
      state.day = null;
      render();
      contentEl.scrollTop = 0;
      break;
    case 'toggle-meal':
      toggleCheck(el, 'doneMeals', mealCheckKey(Number(el.dataset.idx)), ICONS.checkMeal);
      break;
    case 'toggle-ex':
      toggleCheck(el, 'doneEx', exCheckKey(Number(el.dataset.idx)), ICONS.checkEx);
      break;
    case 'toggle-video':
      toggleVideo(el, Number(el.dataset.idx));
      break;
    case 'toggle-ref':
      state.openRef[el.dataset.ref] = !state.openRef[el.dataset.ref];
      renderReferenceContent();
      contentEl.scrollTop = scroll;
      break;
    case 'add-weight':
      addWeight();
      break;
    case 'delete-weight': {
      state.weightLog = state.weightLog.filter(w => w.id !== Number(el.dataset.id));
      persist('mtapp-weight-log', state.weightLog);
      renderProgressContent();
      contentEl.scrollTop = scroll;
      break;
    }
  }
});

render();

/* ── service worker (offline support) ───────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
