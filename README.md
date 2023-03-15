*XLIDEJS - Créez des sliders et galeries sur votre site web à la volée*
*XLIDEJS - Create sliders and galleries on your website on the fly*

**Commençons par le commencement !**

**Let's start by the beginning !** 
>
>**Télécharger xlidejs || Download xlidejs**
>
>Cliquez sur le lien ci-dessous pour télécharger la librairie.
>Click on the link below to download the library.
>
>
>*<a href='https://github.com/dev0ps221/xlidejs/raw/main/dist/xlidejs.zip' style='padding:2%;border-radius:0.5em;background:#bbd3c7;' target='_blank'>xlidejs.zip download</a>*
>
>Après téléchargement extrayez les fichiers dans le répértoire de votre choix, et à chaque fois que vous avez besoin de la librairie faîtes en sorte de copier ces fichier dans le même répértoire que votre projet.
>
>After downloading extract the files in the directory of your choice, and each time you need the library make sure to copy these files in the same directory as your project.
>

>**Inclure la librairie || Include the library**
>
>La librairie est principalement composée de deux fichiers : xlide.css et xlide.js 
>
>The library is mainly composed of two files: xlide.css and xlide.js:
>
>Pour l'utiliser, *AU MOINS* ces deux fichiers doit être accessible depuis notre page web
>
>To use it, *AT LEAST* these two files must be accessible from our web page
>
>
>***-xlide.css :***
>
>Ce fichier définit le style de base de nos futurs sliders et galeries.  
>This file defines the basic style of our future sliders and galleries.
>
>
>Pour l'inclure rajoutez cette ligne entre les deux balises <body>..</body> de notre fichier html:  
>To include it, add this line between the two <body>..</body> tags of our html file:
>
>
>> ```html                            
>> <link rel='stylesheet'  href='xlide.css'/>
>> ```                         
>                        
>***-xlide.js :***
>
>c'est la librairie en tant que telle, toutes les classes et fonctions sont définies dedans. Pour le rajouter au projet rajoutons cette ligne.: 
>
>it's the library as such, all the classes and functions are defined in it. To add it to the project let's add this line:
>
>> ```html                        
>> <script src='xlide.js'>
>> </script>
>> ```                         
>C'est tout, nous n'avons plus qu'à créér nos sliders partout où on veut sur nos sites web.
>Une fois que la librairie est chargée nous avons accès aux fonctions qu'elle nous offre et pouvons nous faire plaisir :)

>That's all, we only have to create our sliders, everywhere we want on our websites.
>Once the library is loaded we have access to the functions it offers us and can make us happy :)

**Créons notre premier \*xlide!**

**Let's create our first \*xlide!** 

>**Définir la cible de notre slider || Define the target of our slider**
>
>Commençons par définir l'élément qui va contenir notre slider, prenons dans notre cas ce div :
>
>Let's start by defining the element that will contain our slider, take in our case this div:
>>```html
>><div class='simpleslide' height='480px'>
>></div>
>>```
>C'est tout ce dont nous avons besoin côté html, tout le reste sera géré du côté de notre code javascript.
>
>That's all we need on the html side, everything else will be handled on our javascript side.
>
>**Créér et afficher notre slider || Create and show our slider**
>
>Créér notre slider est très simple, la librairie xlidejs nous fournit une fonction qui se chargera de créér les différents éléments de notre slider, de le configurer, et juste après de le monter sur l'élément cible de notre choix via un selecteur css ( dans notre cas c'est notre élément div et son selecteur est le selecteur de sa classe est `.simpleslide` ), le nom de cette fonction : `xl` 
>
>Creating our slider is very simple, the xlidejs library provides us with a function that will take care of creating the different elements of our slider, configuring it, and just after mounting it on the target element of our choice via a css selector ( in our case it is our div element and its selector is the selector of its class is `.simpleslide` ), the name of this function: `xl`
>
>***Eh bien ! allons-y***
>
>***Well ! let's go***
>
>Rajoutons ce script à notre page web (vous pouvez très bien écrire le code sur un fichier js à part et l'inclure dans la page, cela ne dépend que de vous)
>
>Let's add this script to our web page (you can very well write the code on a separate js file and include it in the page, it's up to you)
>
>
>>```html
>><script type="application/javascript">
>>//Initialisons d'abord notre slider
>>//Let's first initialize our slider
>>const slide = xlide()
>>
>>//Ci-dessous est un Array contenant les liens vers les images de notres slider */
>>//Below is the Array containing the links to the images of our slider
>>
>>const images = ['img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg']
>>slide.addImages(images)
>>
>>//On fait en sorte que le slide démarre dès qu'il est monté
>>//We make sure that the slide starts as soon as it is mounted
>>slide.addOption('autoplay')
>>
>>//On affiche finalement notre slider sur notre div 
>>//We finally display our slider on our div
>>slide.appendTo('.simpleslide')
>>
>></script>
>>```
>C'est tout, nous avons un simple slider qui démarre automatiquement et qui s'adapte à la taille de son conteneur (notez que l'attribut height que nous définissons au niveau de notre div est optionnelle)
>
>C'était facile non ?
>
>That's it, we have a simple slider that starts automatically and adapts to the size of its container (note that the height attribute that we define at our div level is optional)
>
>It was easy right?
>
>
>**Mais, je fais comment si je veux changer, l'animation du slider, ou même la durée entre deux transitions ?**
>
>**But, how do I do if I want to change the animation of the slider, or even the duration between two transitions?**
>
>
>Encore une fois la réponse est : simple.
>Ce sont juste des options, et comme vous l'avez sans doute remarqué dans notre exemple, l'objet que renvoie `xl()` comporte une méthode `addOptions` qui nous permet justement de définir les options de notre slider.
>
>Once again the answer is: simple.
>These are just options, and as you may have noticed in our example, the object returned by `xl()` includes an `addOptions` method which allows us to define the options of our slider.
>
>Pour que notre slider défile horizontalement, rajoutons la ligne suivante à notre code :  
>
>To make our slider scroll horizontally, add the following line to our code:
>
>>```js
>>slide.addOption('horizontal')
>>```
>
>
>Pour la durée aussi, nous allons utilisons notre methode `addOption` de cette manière:
>
>For the duration too, we'll use our `addOption` method like this:
>>```js
>>// nous définissons la valeur en ms (3000ms équivaut à 3 secondes)
>>slide.addOption(['interval',3000]) 
>>```
>Notez qu'ici l'argument passé à `addOption` est un Array, justement parce que nous devons spécifier une valeur à notre option. Gardez cela en tête pour chaque option qui aura à avoir une valeur spécifique nous passerons un Array ayant respectivement une valeur pour le nom de l'option et une autre pour la valeur de l'option en soi.
>
>Note that here the argument passed to `addOption` is an Array, precisely because we need to set a value to our option. Keep this in mind for each option that will have to have a specific value we will pass an Array having respectively a value for the name of the option and another for the value of the option itself.
>
>
>**Note:**
>La méthode `appendTo` ne doit être appellée qu'apres configuration du slider, si vous ajoutez des options avant cette fonction, ils risquent de ne pas avoir d'effet.
>
>**Note:**
>The `appendTo` method should only be called after configuring the slider, if you add options before this function, they may not have any effect.
>
>
>Voici une liste des options qui sont pour le moment disponible :
>
>Here is a list of the options that are currently available:
>
>
>>***interval:*** intervalle entre deux transitions | interval between two transitions
>>
>>***autoplay:*** le slider s'anime automatiquement ou non | the slider animates automatically or not
>>
>>***controls:*** des controls à notre slide pour changer d'image | controls to our slide to change image
>>
>>***previews:*** des miniatures de chaque images du slide, similaire au controls mais avec des images | thumbnails of each slide image, similar to controls but with images
>>
>>***vertical:*** le slider défile , verticalement de la gauche vers la droite | the slider scrolls vertically, from top to bottom
>>
>>***horizontal:*** le slider défile , horizontalement du haut vers le bas | the slider scrolls horizontally, from left to right
>>
>>***rotate:*** le slider défile en rotation | the slider scrolls in rotation
>>
>>***rvertical:*** le slider défile horizontalement, du bas vers le haut | the slider scrolls vertically, from bottom to top
>>
>>***rhorizontal:*** le slider défile verticalement, de la droite vers la gauche | the slider scrolls horizontally, from right to left
>>
>>***rrotate:*** le slider défile en rotation inverse | the slider scrolls in reverse rotation
>>

