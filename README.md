# install
    - Node JS >=20.0.5
    - Power BI Desktop
    - python >=3.10(recommended 3.11)
# install pbiviz local
    - npm i -g powerbi-visuals-tools@latest
    (https://learn.microsoft.com/vi-vn/power-bi/developer/visuals/environment-setup)
# setup Power BI Desktop
    - Open Power BI Desktop
    - File>option>Options and Settings>Options
    - Follow this image ![image](https://github.com/RyugaRyuzaki/powerbi_openbim-components/assets/89787521/e6575eca-177a-4fa8-b3ec-728cef8dd1bb)
    - Then next image ![image](https://github.com/RyugaRyuzaki/powerbi_openbim-components/assets/89787521/728fff75-39e9-4e32-9888-81c5f30b2183)
    - That means allow using cross filtering and python to call api resonse
# Setup server
    - clone this repo :https://github.com/RyugaRyuzaki/fragment-server
    - See README.md install package and run server : npm run dev
    - Create uploads folder in that repo
    - After server run success,use Postman to upload an ifc file
    - Follow this image ![image](https://github.com/RyugaRyuzaki/powerbi_openbim-components/assets/89787521/b72338a5-6418-4b74-a2e2-325b22f974f0)
    - If server send status 200 => OK
    - Then see uploads folder it will have 2 file <filename>.gz and <filename>frag.gz
    - use exam.py to call data in Power BI ( change fileId same your file name)
# Get Data in Power BI
    - In Power BI Home>GetData>Orther
    - Follow this image ![image](https://github.com/RyugaRyuzaki/powerbi_openbim-components/assets/89787521/6f39861a-d5e7-4502-8e9f-8cfc2b1a05b5)
    - Copy and past exam.py to the script and run
    - Detail watch the video below
# Setup repo
    - Open Terminal 
    - Make sure pbiviz to installed in your machine run : pbiviz
    - If this image ![image](https://github.com/RyugaRyuzaki/powerbi_openbim-components/assets/89787521/a318d03a-afcd-4d93-a8cf-f4fcaeba42c5)
        is OK
    - Run : npm install to install all package
    - Change fileId same fileId of exam.py
    - To generate run : pbiviz package
    - It will be automaticly create a folder dist

    
    

