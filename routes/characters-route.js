import http from 'http';
import fs from 'fs/promises';

export async function handleCharacterRoute(pathSegments, request, response){
    let nextSegment = pathSegments.shift();

    //Variabler med information om respektive karaktär
    let judyHopps = {
        "name": "Judy Hopps",
        "species": "rabbit",
        "gender": "F",
        "occupation": "police officer",
        "personalityTraits": [
            "energetic",
            "overconfident",
            "perky",
            "heroic",
            "self-righteous",
            "optimistic",
            "intelligent",
            "persistent",
            "ambitious",
            "enthusiastic",
            "diligent",
            "idealistic",
            "loyal",
            "selfless",
            "caring",
            "forgiving",
            "courageous"
        ]
    };

    let leodoreLionheart = {
        "name": "Leodore Lionheart",
        "species": "lion",
        "gender": "M",
        "occupation": "mayor",
        "personalityTraits": [
            "charismatic",
            "prideful",
            "blustery",
            "commanding",
            "gruff",
            "practical",
            "intelligent",
            "noble",
            "inspiring",
            "occasionally sarcastic",
            "somewhat smarmy",
            "pompous",
            "dismissive",
            "neglectful"
        ]
    };

    //Sker om ingen ytterligare "fråga" efter sökvägen har angetts eller en sökväg som inte finns har angetts samt en "hemsida" med länkar för att snabbare nå ändpunkterna
    if (!nextSegment){
        if (pathSegments.length > 0){
        response.writeHead(404,  {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        response.end();
        return;
    }   
        //kollar om HTTP metoden är GET, annars ges ett 405 fel ut (method not allowed)
        if (request.method !== 'GET'){
            response.writeHead(405, {'content-Type': 'text/plain'});
            response.write('405 Method Not Allowed');
            response.end();
            return;
        }
        
        let links = [
            {
                "link": "/characters/judyhopps",
                "text": "Judy Hopps"
            },
            {
                "link": "/characters/leodorelionhart",
                "text": "Leodore Lionhart"
            }
            
        ]

        
        //skapar informationen om karaktären som angetts i "frågan" till en listform
        let linksString = '';
        for (let i = 0; i < links.length; i++){
            let linkObj = links[i];
            linksString += '<li><a href="' + linkObj.link + '">' + linkObj.text + '</a></li>';
        }

        //läser volvo filen characters till en string och sedan byter ut characterlinks mot listan
        let template = (await fs.readFile('templates/characters.volvo')).toString();
        template = template.replaceAll('%{characterLinks}%', linksString);

        //200 = ok. förfrågan är ok och godkänd av webservern
        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        response.write(template);
        response.end();
        return;
    }



    if (nextSegment === 'judyhopps'){
        if (pathSegments.length > 0){
            response.writeHead(404,  {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
            response.end();
            return;
        }
        if (request.method !== 'GET'){
            response.writeHead(405, {'content-Type': 'text/plain'});
            response.write('405 Method Not Allowed');
            response.end();
            return;
        }

        //läser volvo filen judyhopps till en string
        let template = (await fs.readFile('templates/judyhopps.volvo')).toString();

        //Byter ut strings mot information från variabeln judyHopps
        template = template.replaceAll('%{name}%', judyHopps.name);
        template = template.replaceAll('%{species}%', judyHopps.species);
        template = template.replaceAll('%{gender}%', judyHopps.gender);
        template = template.replaceAll('%{occupation}%', judyHopps.occupation);
        
        //kör igenom judyHoops personality variablen och skapar en lista av den infon
        let personalityTraitsString = '';
        for (let i = 0; i < judyHopps.personalityTraits.length; i ++){
            personalityTraitsString += '<li>' + judyHopps.personalityTraits[i] + '</li>';
        
        }

        //Byter ut personalityTraits med information
        template = template.replaceAll('%{personalityTraits}%', personalityTraitsString);
        
        
        //200 = ok. förfrågan är ok och godkänd av webservern
        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        response.write(template);
        response.end();
        return;
    }

    if (nextSegment === 'leodorelionhart'){
        if (pathSegments.length > 0){
            response.writeHead(404,  {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
            response.end();
            return;
        }
        if (request.method !== 'GET'){
            response.writeHead(405, {'content-Type': 'text/plain'});
            response.write('405 Method Not Allowed');
            response.end();
            return;
        }
        
        //läser volvo filen leodorelionhart till en string
        let template = (await fs.readFile('templates/leodoreLionhart.volvo')).toString();

        //Byter ut strings mot information från variabeln leodorelionhart
        template = template.replaceAll('%{name}%', leodoreLionheart.name);
        template = template.replaceAll('%{species}%', leodoreLionheart.species);
        template = template.replaceAll('%{gender}%', leodoreLionheart.gender);
        template = template.replaceAll('%{occupation}%', leodoreLionheart.occupation);
        
        //kör igenom leodorelionhart personality variablen och skapar en lista av den infon
        let personalityTraitsString = '';
        for (let i = 0; i < leodoreLionheart.personalityTraits.length; i ++){
            personalityTraitsString += '<li>' + leodoreLionheart.personalityTraits[i] + '</li>';
        
        }

        //Byter ut personalityTraits med information
        template = template.replaceAll('%{personalityTraits}%', personalityTraitsString);
        
        //200 = ok. förfrågan är ok och godkänd av webservern
        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        response.write(template);
        response.end();
        return;
    }

    //Visar 404 not found om inte sökvägen hittas.
    response.writeHead(404, {'content-Type': 'text/plain'});
    response.write('404 Not Found');
    response.end();
    return;
    
}