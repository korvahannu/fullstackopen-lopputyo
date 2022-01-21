# työaikakirjanpito

| päivä | aika | mitä tein  |
| :----:|:-----| :-----|
| 4.1.2021. | 1.5    | Alustin front- ja backending. Frontending alustava toiminnallisuus hahmotettu. Mongo yms. Säädöt toimii backendissä. Git initioitu sekä ajanhallinnan taulukko (eli tämä). |
| 5.1.2021. | 2.5    | Eslint otettu käyttöön. Backendissä toimii nyt sisäänkirjautuminen, käyttäjien luominen adminin toimesta, admin tunnukset ym. Skeemat initioitu. Testeri alustettu. Koodia kommentoitu parhaan visioni mukaan |
| 6.1.2021. | 2    | Supertest ja jest testit tehty user ja login -routereihin. Säädetty vähän miten erityyppiset käyttäjät pääsee käsiksi tietoihin. Alustettu categories -routeria. |
| 6.1.2021. | 2    | Categories-router tehty ja testerit sitä varten kirjoitettu |
| 7.1.2021. | 2.5    | Accounts, paymentMethods ja user -routerit asennettu. Testeriä säädetty hieman. Käyttäjän voi nyt disabloida. Testerit pitää vielä tehdä uusille routereille, sitten voin tehdä viimeisenä transactions -router ja täten backendin pitäisi teoriassa toimia odotetusti. |
| 8.1.2021. | 3    | Testerit kirjoitettu routeille accounts, paymentMethods ja user. Monta bugia löytyi joten testien kirjoittaminen on osoittautunut hedelmälliseksi. |
| 9.1/10.1.2021. | 3    | Transaction routeri kirjoitettu loppuun. Testerit kirjoitettu. Bugeja korjailtu. Alustava backend valmis? |
| 10.1.2021. | 1    | Pientä koodin refaktorointia ja turhien kommentien poistoa |
| 12.1.2021. | 4    | Yritin tehdä kaikenlaisia hienoja lisäominaisuuksia, jotka lopulta poistin. Jäljelle jäi session control ja logout -router. Sessio expiroituu automaagisesti 24h jälkeen. Testerit kirjoitettu. |
| 13.1.2021. | 1.5    | Morgan otettu käyttöön pyyntöjen loggausta varten. Lisätty ominaisuus, jossa käyttäjän rekisteröinti luo hänelle oletusarvoiset kategoriat, tilit ja maksutavat. Nyt jos käyttäjä disabloidaan, hänen sessiot poistetaan. |
| 18.1.2021. | 2   | Redux ym. avustavat kirjastot otettu käyttöön frontendissä, log in prototyyppi tehty ja toimii (pystyt kirjautumaan sisään). Jotain backendin pikkukorjauksia tehty. |
| 19.1.2021. | 1.5   | Aika nahkeasti lähti nyt frontending tekeminen käyntiin, mutta: logout nyt kirjaa pois käyttäjän session backendistä (unohdin tehdä tämän eilen). Tein pari custom hookkia mitä tulen tulevaisuudessa käyttämään. Poiston komponentin loginHelper ja hieman refaktoroin koodia selkolukuisemmaksi. |
| 20.1.2021. | 1.5   | Date -osio lisätty transactioniin (timestamp ei ole riittävä tieto). Nyt periaatteessa käyttäjät voivat lisätä tuloja ja menoja. Mitään virheentarkastusa ei ole ja koodi sekä ulkoasu tarvii HUOMATTAVAA refaktorointia. Jostain se on vain aloitettava. Versio nyt on 0.011. |
| 21.1.2021. | 3.5   | Noin tunti meni kun luin Material-UI dokumentaatiota. Loput ajat meni sen implementoidessa => Login screen on nyt material UI:lla tehty. Tein myös notificationreducerin, jota eri komponentit voivat käyttää viestien lähettämiseen. Toistaiseksi vain login-screen käyttää sitä. Alustin myös vähän transactions-listan muuttamista MUI Datagridiksi. Omasta mielestä dokumentaatio datagridiin ollun melko hankalaa luettavaa, mutta nyt sain esitettävään muotoon sen. |
