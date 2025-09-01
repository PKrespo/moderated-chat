// ⚠️ Demo simplificado: ajuste à sua realidade (i18n, stemming, regex etc.)
export const lists = {
  hate: [
    // Racismo - PT-BR
    "racista", "racismo", "negro", "preto", "macaco", "escravo", "senzala", "neguinho", "pretinho",
    "crioulo", "mulato", "pardo", "africano", "banana", "chocolate", "carvão", "tição",
    "nazista", "hitler", "holocausto", "supremacia", "ariano", "raça superior", "raça inferior",
    
    // Racismo - EN
    "racist", "racism", "nigger", "negro", "monkey", "slave", "plantation", "ape", "blackie",
    "darkie", "colored", "coon", "spook", "nazi", "hitler", "holocaust", "supremacy", "aryan",
    
    // Homofobia - PT-BR
    "homofobia", "homofóbico", "gay", "viado", "bicha", "sapatão", "traveco", "boiola", "fresco",
    "maricas", "veado", "baitola", "pederasta", "sodomita", "invertido", "afeminado", "florzinha",
    "maria", "mulherzinha", "femea", "tchutchuca", "pocpoc", "boiolinha", "gayzinho",
    "lesbica", "lésbica", "sapatona", "caminhoneira", "machorra", "masculina demais",
    "trans", "transexual", "travesti", "shemale", "ladyboy", "transformista",
    
    // Homofobia - EN  
    "homophobic", "fag", "faggot", "dyke", "tranny", "queer", "homo", "fairy", "sissy",
    "pansy", "cocksucker", "buttfucker", "lesbian", "butch", "transgender", "shemale",
    
    // Sexismo e Misoginia - PT-BR
    "sexismo", "sexista", "vadia", "puta", "vagabunda", "piranha", "rapariga", "prostituta",
    "cadela", "galinha", "oferecida", "rodada", "usada", "safada", "cachorra", "ordinária",
    "mulher da vida", "meretriz", "rameira", "periguete", "popozuda", "gostosa", "gata",
    "mulher objeto", "carne", "pedaço", "bunduda", "tetuda", "rabuda", "cavala",
    
    // Sexismo - EN
    "sexist", "bitch", "whore", "slut", "cunt", "pussy", "skank", "tramp", "hoe",
    "hooker", "prostitute", "cumslut", "cockslut", "fuckdoll", "meat", "piece",
    
    // Xenofobia - PT-BR
    "gringo", "estrangeiro", "imigrante", "refugiado", "invasor", "parasita", "praga",
    "boliviano", "paraguaio", "haitiano", "venezuelano", "argentino", "uruguaio",
    "japonês", "chinês", "coreano", "japa", "china", "olho puxado", "amarelo",
    "alemão", "nazista", "russo", "comunista", "americano", "yankee",
    
    // Xenofobia - EN
    "foreigner", "immigrant", "refugee", "invader", "parasite", "plague", "alien",
    "mexican", "beaner", "wetback", "chink", "gook", "jap", "kraut", "commie",
    
    // Religião - Ofensas
    "judeu", "israelense", "sionista", "porco", "sujo", "avarento", "usurário",
    "muçulmano", "árabe", "terrorista", "bomba", "jihad", "islâmico", "macumbeiro",
    "evangélico", "crente", "fanático", "católico", "papa", "padre", "pastor",
    
    // Capacitismo
    "deficiente", "aleijado", "cego", "surdo", "mudo", "paralítico", "inválido",
    "retardado", "mongoloide", "débil", "mental", "doente", "louco", "maluco"
  ],
  
  threats: [
    // Ameaças Físicas - PT-BR
    "vou te bater", "vou te matar", "vou te quebrar", "ameaça", "morte", "morrer",
    "vai morrer", "te mato", "te quebro", "pancada", "surra", "espancamento",
    "te pego", "te encontro", "te persigo", "te caço", "vingança", "acerto",
    "porrada", "paulada", "facada", "tiro", "bala", "arma", "revólver", "pistola",
    "te corto", "te esfaqueo", "te estrangulo", "te enforco", "te afogo",
    "vou na sua casa", "sei onde você mora", "te pego na rua", "cuidado comigo",
    "você vai se arrepender", "vai pagar", "ajuste de contas", "acerto final",
    
    // Ameaças Físicas - EN
    "i will kill you", "i will beat you", "threat", "murder", "death", "die",
    "gonna kill", "beat up", "violence", "hurt", "harm", "attack", "assault",
    "punch", "kick", "stab", "shoot", "gun", "knife", "weapon", "bullet",
    "find you", "get you", "hunt you", "revenge", "payback", "regret",
    "where you live", "know your address", "watch out", "be careful",
    
    // Ameaças Psicológicas - PT-BR
    "vou te destruir", "vou acabar com você", "sua vida vai virar inferno",
    "vou arruinar sua vida", "vou te prejudicar", "vai se dar mal",
    "vou contar para todo mundo", "vou espalhar", "vou expor você",
    "você vai se ferrar", "vai ter consequências", "não vai escapar",
    
    // Ameaças Online
    "vou hackear", "vou invadir", "vou derrubar", "ddos", "doxx", "doxing",
    "vou vazar seus dados", "vou descobrir quem você é"
  ],
  
  offensive: [
    // Palavrões Clássicos - PT-BR
    "burro", "idiota", "imbecil", "estúpido", "babaca", "otário", "trouxa", "bobo",
    "palhaço", "retardado", "débil", "mongoloide", "cretino", "desgraçado", "infeliz",
    "filho da puta", "filha da puta", "fdp", "merda", "bosta", "caralho", "porra",
    "cacete", "cu", "cuzão", "arrombado", "vagabundo", "lixo", "escória", "peste",
    "nojento", "asqueroso", "seboso", "fedorento", "sujo", "imundo", "porco",
    
    // Mais Palavrões PT-BR
    "buceta", "xoxota", "xereca", "pepeca", "boceta", "xana", "ppk", "bucetinha",
    "pau", "pinto", "pica", "rola", "pirocão", "piroca", "cacete", "vara",
    "punheta", "siririca", "masturbação", "foder", "fuder", "comer", "trepar",
    "transar", "meter", "enfiar", "penetrar", "gozar", "ejacular", "orgasmo",
    "broxa", "impotente", "mal comido", "mal fodido", "virgem", "inexperiente",
    
    // Insultos Físicos - PT-BR
    "feio", "horrível", "monstro", "aberração", "disforme", "aleijado", "deformado",
    "gordo", "obeso", "baleia", "elefante", "vaca", "porco", "hipopótamo",
    "magro", "esqueleto", "palito", "vara", "ossudo", "desnutrido", "anoréxico",
    "baixinho", "anão", "tampinha", "pocket", "lilliputiano", "pequenino",
    "alto demais", "girafa", "poste", "gigante", "desajeitado", "comprido",
    "careca", "calvo", "pelado", "brilhoso", "lisinho", "sem cabelo",
    "cabelo ruim", "pixaim", "duro", "armado", "espetado", "ruim",
    "dente podre", "banguela", "dentuca", "ferradura", "cavalo", "burro",
    "nariz grande", "narigudo", "bico", "tucano", "narigão", "focinho",
    
    // Palavrões - EN
    "stupid", "idiot", "moron", "dumb", "retard", "retarded", "dumbass", "fool",
    "asshole", "bastard", "bitch", "damn", "fuck", "fucking", "shit", "crap",
    "hell", "piss", "dick", "cock", "pussy", "cunt", "motherfucker", "sucker",
    "loser", "freak", "weirdo", "psycho", "crazy", "nuts", "insane", "mental",
    
    // Insultos Sexuais - EN
    "slut", "whore", "skank", "ho", "hooker", "prostitute", "cumslut", "bitch",
    "dickhead", "cocksucker", "motherfucker", "son of a bitch", "bastard",
    
    // Gírias Ofensivas Brasileiras
    "zé ruela", "zé buceta", "zé mané", "joão ninguém", "maria vai com as outras",
    "pé rapado", "ralé", "gentalha", "canalha", "cafajeste", "sacana", "safado",
    "ordinário", "miserável", "patético", "ridículo", "insignificante", "inútil",
    "zero à esquerda", "menos um", "fracassado", "perdedor", "azarado", "azar",
    
    // Internet Slang Ofensivo
    "noob", "newbie", "lamer", "hater", "troll", "fake", "poser", "wannabe",
    "cringe", "crinjei", "vergonha alheia", "segunda mão", "mico", "vexame"
  ],
  
  spammy: [
    // Spam Clássico - PT-BR
    "ganhe dinheiro rápido", "clique aqui", "promoção imperdível", "oferta limitada",
    "só hoje", "grátis", "prêmio", "loteria", "sorteio", "concurso", "ganhador",
    "parabéns você ganhou", "foi selecionado", "prêmio exclusivo", "oferta especial",
    "desconto", "promoção", "liquidação", "queima de estoque", "oportunidade única",
    "renda extra", "trabalhe em casa", "seja seu próprio chefe", "independência financeira",
    "pirâmide", "marketing multinível", "mlm", "investimento garantido", "lucro certo",
    "bitcoin", "criptomoeda", "forex", "trader", "day trade", "robô", "automático",
    "curso gratuito", "ebook grátis", "webinar", "palestra", "masterclass",
    "link na bio", "chama no whats", "manda direct", "segue lá", "curte aí",
    
    // Spam - EN  
    "win money fast", "click here", "unmissable promotion", "limited offer", "today only",
    "free money", "prize", "lottery", "winner", "congratulations", "selected",
    "exclusive offer", "special deal", "discount", "sale", "clearance", "opportunity",
    "work from home", "be your own boss", "financial freedom", "pyramid", "mlm",
    "guaranteed investment", "sure profit", "crypto", "forex", "trading", "robot",
    "free course", "webinar", "masterclass", "link in bio", "dm me", "follow",
    
    // Golpes Comuns
    "pix", "transferência", "depósito", "antecipação", "empréstimo", "financiamento",
    "cartão aprovado", "limite liberado", "score", "serasa", "spc", "cadastro positivo",
    "regularize seu cpf", "limpe seu nome", "quite suas dívidas", "negociação",
    "recupere seu dinheiro", "processo", "indenização", "auxílio", "benefício",
    "fgts", "pis", "pasep", "restituição", "imposto de renda"
  ],
  
  pii_leak: [
    // Expressões regulares para dados sensíveis
    /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/i, // CPF
    /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/i, // CNPJ
    /\b\d{2}\s?\d{5}-?\d{4}\b/i, // telefone BR (XX XXXXX-XXXX)
    /\b\d{4,5}-?\d{4}\b/i, // telefone simples
    /\b\d{16}\b/, // cartão 16 dígitos
    /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/i, // cartão com espaços
    /\b\d{4}-?\d{4}-?\d{4}-?\d{4}\b/i, // cartão com hífens
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i, // email
    /\bcep\s*:?\s*\d{5}-?\d{3}\b/i, // CEP
    /\brg\s*:?\s*\d{1,2}\.?\d{3}\.?\d{3}-?\d{1}\b/i, // RG
    /\bsenha\s*:?\s*\w+/i, // senha
    /\bpassword\s*:?\s*\w+/i, // password
    /\bpix\s*:?\s*[\w@.-]+/i, // chave PIX
    
    // Palavras que indicam vazamento de dados
    "cpf", "cnpj", "rg", "senha", "password", "cartão", "credit card",
    "conta", "agência", "banco", "pix", "chave pix", "dados pessoais",
    "endereço", "address", "telefone", "celular", "phone", "email",
    "login", "user", "usuário", "pin", "token", "código", "verificação"
  ]
};
