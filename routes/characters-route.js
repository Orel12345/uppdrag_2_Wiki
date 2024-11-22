import http from 'http';
import fs from 'fs/promises';

export async function handleCharacterRoute(pathSegments, request, response){
    let nextSegment = pathSegments.shift();

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

    if (!nextSegment){
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


        let linksString = '';
        for (let i = 0; i < links.length; i++){
            let linkObj = links[i];
            linksString += '<li><a href="' + linkObj.link + '">' + linkObj.text + '</a></li>';
        }

        let template = (await fs.readFile('templates/characters.volvo')).toString();
        template = template.replaceAll('%{characterLinks}%', linksString);

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

        let template = (await fs.readFile('templates/judyhopps.volvo')).toString();

        template = template.replaceAll('%{name}%', judyHopps.name);
        template = template.replaceAll('%{species}%', judyHopps.species);
        template = template.replaceAll('%{gender}%', judyHopps.gender);
        template = template.replaceAll('%{occupation}%', judyHopps.occupation);
        
        let personalityTraitsString = '';
        for (let i = 0; i < judyHopps.personalityTraits.length; i ++){
            personalityTraitsString += '<li>' + judyHopps.personalityTraits[i] + '</li>';
        
        }

        template = template.replaceAll('%{personalityTraits}%', personalityTraitsString);
        
        
        
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
        
        let template = (await fs.readFile('templates/leodoreLionhart.volvo')).toString();

        template = template.replaceAll('%{name}%', leodoreLionheart.name);
        template = template.replaceAll('%{species}%', leodoreLionheart.species);
        template = template.replaceAll('%{gender}%', leodoreLionheart.gender);
        template = template.replaceAll('%{occupation}%', leodoreLionheart.occupation);
        
        let personalityTraitsString = '';
        for (let i = 0; i < leodoreLionheart.personalityTraits.length; i ++){
            personalityTraitsString += '<li>' + leodoreLionheart.personalityTraits[i] + '</li>';
        
        }

        template = template.replaceAll('%{personalityTraits}%', personalityTraitsString);
        
        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        response.write(template);
        response.end();
        return;
    }


    response.writeHead(404, {'content-Type': 'text/plain'});
    response.write('404 Not Found');
    response.end();
    return;
    
}