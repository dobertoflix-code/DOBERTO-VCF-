# DOBERTO VCF

Sit pou moun anrejistre non ak nimewo WhatsApp yo pou gen plis vwè sou status yo.

## Estrikti
- `server.js` — backend Express (API + sèvi fichye piblik yo)
- `public/` — frontend (HTML/CSS/JS senp, pa gen build step)
- `schema.sql` — schema Supabase pou kreye tab `registrations`
- `.env.example` — varyab anviwònman ou dwe konfigire

## Etap enstalasyon

### 1. Kreye pwojè Supabase
1. Ale sou [supabase.com](https://supabase.com) → kreye yon pwojè.
2. Nan **SQL Editor**, kole kontni `schema.sql` epi jwe l.
3. Nan **Project Settings → API**, kopye:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` key (SEKRÈ, pa `anon` key) → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Konfigire varyab anviwònman
Kopye `.env.example` → `.env` epi ranpli valè yo:
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
JWT_SECRET=yon-tèks-alazar-long
ADMIN_PASSWORD=modpas-admin-ou
MIN_TO_UNLOCK=500
MAX_IN_FILE=50000
```

### 3. Teste an lokal
```bash
npm install
npm start
```
Louvri `http://localhost:3000`.

### 4. Deplwaye sou Render (backend + frontend ansanm)
Paske `server.js` sèvi dosye `public/` yo dirèkteman (`express.static`), ou ka
deplwaye **tout bagay an antye sou Render** san bezwen Netlify separe:
1. Push kòd la sou GitHub.
2. Sou Render → **New Web Service** → konekte repo a.
3. Build command: `npm install`
4. Start command: `npm start`
5. Ajoute tout varyab `.env` yo nan **Environment** tab Render la.
6. (Opsyonèl) Sèvi ak [UptimeRobot](https://uptimerobot.com) pou kenbe sèvè a "cho" si w sou plan gratis.

> Si ou prefere separe frontend/backend (tankou lòt pwojè w yo), ou ka mete `public/`
> sou Netlify/Vercel epi chanje tout `fetch('/api/...')` nan fichye JS yo pou yo pwente
> sou URL backend Render la (egzanp: `https://doberto-vcf.onrender.com/api/...`).

## Kijan sistèm nan mache
- **Paj akèy (`/`)**: moun antre non, email (opsyonèl), ak nimewo WhatsApp yo (ak yon
  lis TOUT kòd peyi nan mond lan). Pou Ayiti (509), nimewo a **dwe gen egzakteman 8 chif**.
- **Lis moun (`/list.html`)**: tout moun ka wè NON yo sèlman — nimewo yo pa janm afiche.
- **Download VCF**: disponib sèlman lè gen omwen `MIN_TO_UNLOCK` (500 pa default) moun
  enskri. Pou download, moun nan dwe konfime non + nimewo li te itilize pou enskri a
  (sa verifye se yon moun ki deja anrejistre k ap mande fichye a). Fichye a limite a
  `MAX_IN_FILE` (50 000 pa default) kontak.
- **Admin (`/admin.html`)**: konekte ak `ADMIN_PASSWORD` la pou wè lis konplè a (non +
  nimewo konplè) ak fè yon ekspòtasyon CSV.

## Sekirite
- Sèl backend la gen aksè ak Supabase (`service_role` key pa janm ekspoze bay frontend).
- RLS (Row Level Security) aktive sou tab la — pa gen okenn "policy" piblik.
- Rate limiting aplike sou enskripsyon, download, ak login admin pou anpeche abi/spam.
- Sesyon admin lan itilize yon JWT ki ekspire apre 12è.
