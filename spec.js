//PhysicianSearch Testing
describe('CGM_CLICKDOC_application_Testing',function(){
        
        it('check Whether the homepage can be opened normally whether the search also jumps normally',function(){
                browser.ignoreSynchronization = true;
                browser.get('https://demo.clickdoc.de/');
                browser.driver.sleep(1000);		
                var betätigen_btn = element(by.xpath('//modal-container/div/div/app-consent-gdpr-accept-step/div/div[3]/button[@class="btn btn-primary agree-consent agree-consent--all"]'));
                betätigen_btn.click();
                browser.driver.sleep(2000); 
                 //1 CLICKDOC Front-Page is displayed
                expect(browser.getTitle()).toEqual('CLICKDOC - Arzttermine online buchen & Gesundheits-Apps');
                expect(browser.getCurrentUrl()).toEqual('https://demo.clickdoc.de/cd-de/');

                //2 Click on „Suchseite“
                var suchseite = element(by.xpath('//app-root/div[2]/div/app-header/div/div[2]/div/div[2]/ul/li[3]/a[@angularticsaction="Go to search"]'));
                suchseite.click();
                browser.driver.sleep(1000);
                //jump to searchpage providing a search-section, with sorting options to the left and a result-body at the center
                expect(browser.getTitle()).toEqual('Clickdoc - Buche Deinen Arzttermin direkt online');
                expect(browser.getCurrentUrl()).toEqual('https://demo.clickdoc.de/cd-de/search');
        });
        
        //get all elements form the search-section
        var Name_Input_field = element(by.id('search-query-typeahead'));
        var Location_Input_field = element(by.id('search-location-typeahead'));
        var Online_Bookable_Checkbox = element(by.id('onlineBooking'));
        var Videoconference_Checkbox = element(by.id('videoCall'));
        var Barrier_Free_Checkbox = element(by.id('accessibility'));
        var Search_Button = element(by.xpath('//button[@angularticsaction="Search submit"]'));
       
        //get all elements from the Sorting-Section
        var Best_Results_Checkbox = element(by.id('bestHit'));
        var Alphabetical_Names_Checkbox = element(by.id('sortAlphabetically'));
        var Distance_Checkbox = element(by.id('noLocation'));
        var Distance_Range_slider = element(by.xpath('//ng5-slider[@angularticsaction="Sort by distance"]'));

        //get the default Result-Section
        var empty_result = element(by.xpath('//app-empty-state'));
        var notification = element(by.xpath('//app-empty-state/div/div[2]/div/span[@translate="search.no.input.given.label"]'));

        var dropdown = element(by.xpath('//typeahead-container'));
        var test_name = 'Beate';

        it('check if all elements of search page are displayed normally',function(){
	
       	
                browser.get('https://demo.clickdoc.de/cd-de/search');
                
                var sorting_options = element(by.xpath('//*[@id="search"]/div/div[@class="col-sm-12 col-md-4 col-lg-3"]'));
                var result_body = element(by.xpath('//*[@id="search"]/div/div[3]/div/div[@class="panel default-panel hide-filters"]'));
                expect(sorting_options.getLocation()).toEqual(jasmine.objectContaining({x: 350.5, y: 120}));
                expect(result_body.getLocation()).toEqual(jasmine.objectContaining({x: 651, y: 120}));
        
                //3 Check the search-section

                //elements(Specialization/Name Input field, Location Input field, Online Bookable Checkbox, Videoconference Checkbox, Barrier-Free Checkbox, Search-Button) are present
        
                expect(Name_Input_field.isPresent()).toBe(true);
                expect(Location_Input_field.isPresent()).toBe(true);
                expect(Online_Bookable_Checkbox.isPresent()).toBe(true);
                expect(Videoconference_Checkbox.isPresent()).toBe(true);
                expect(Barrier_Free_Checkbox.isPresent()).toBe(true);
                expect(Search_Button.isPresent()).toBe(true);
                //4 Check the Sorting-Section

                //elements(Best Results Checkbox, Alphabetical Names Checkbox, Distance Checkbox, Distance-Range slider) are present

                expect(Best_Results_Checkbox.isPresent()).toBe(true);
                expect(Alphabetical_Names_Checkbox.isPresent()).toBe(true);
                expect(Distance_Checkbox.isPresent()).toBe(true);
                expect(Distance_Range_slider.isPresent()).toBe(true);

                //5 Check the Result-Section
                
                //The Result-Section is initially empty with a notification
                expect(empty_result.isPresent()).toBe(true);
                expect(notification.getText()).toEqual('AUF DER LINKEN SEITE KANNST DU DIE ARZTSUCHE STARTEN.');
        });

                
                

        it('check name input and dropdown of name input',function(){

                browser.get('https://demo.clickdoc.de/cd-de/search');
                browser.driver.sleep(2000);
                //6 Select the „Name“ Inputfield in the search section and enter any input
                
                Name_Input_field.sendKeys(test_name);
                browser.driver.sleep(1000);
        
                /*A dropdown is opened with fitting suggestions according to the entered value
                
                if(dropdown.isPresent()){
                        var name_search_results = element.all(by.xpath('//typeahead-container/button/div[@class="dropdown-item-container ng-star-inserted"]'));
                        name_search_results.then(function(results){
                                for(var i=0; i<results.length;i++)
                                {
                                        expect(results[i].getText()).toContain(test_name); 
                                }
                        });
                };
                */
        
                //7 Enter further input to refine the search
                Name_Input_field.clear();
                var refine_name_input = 'Beate Edel';
                Name_Input_field.sendKeys(refine_name_input);
                browser.driver.sleep(1000);
                /*The provided suggestions are further specified
                if(dropdown.isPresent()){
                        var name_search_results = element.all(by.xpath('//typeahead-container/button/div[@class="dropdown-item-container ng-star-inserted"]'));
                        name_search_results.then(function(results){
                                for(var i=0; i<results.length;i++)
                                {
                                        expect(results[i].getText()).toContain(refine_name_input); 
                                }
                        });
                };
                */
                //8 Enter further input for which no results exist
                var no_exist_name = 'se';
                Name_Input_field.sendKeys(no_exist_name);
                browser.driver.sleep(1000);
                //The suggestion dropdown disappears
                //expect(dropdown.isPresent()).toBe(false);

        });

        it('check the search result with name,location and bookable',function(){
                //9 Enter valid input into „Name“ Inputfield again, and press the „Search“-Button
                browser.get('https://demo.clickdoc.de/cd-de/search');
                browser.driver.sleep(2000);
                Name_Input_field.sendKeys(test_name);
                Search_Button.click();
                browser.driver.sleep(3000);
                //The result-Section is filled with fitting search-results

                var search_results = element.all(by.xpath('//app-contact-card'));
                expect(search_results.isPresent()).toBe(true);

                //10 Check a search-result object
                if(search_results.isPresent()){
                        search_results.then(function(results){
                                for(var i=0; i<results.length; i++)
                                {
                                        //An result object contains following elements:1. Headline 2. Practice-Information  3. Available appointments-section, if any are available
                                        var Headline = results[i].element(by.xpath('//app-contact-header'));
                                        var Practice_Info = results[i].element(by.xpath('//app-contact-details'));
                                        var Appointment = results[i].element(by.xpath('//app-contact-slots-details'));
                                        
                                        expect(Headline.isPresent()).toBe(true); 
                                        expect(Practice_Info.isPresent()).toBe(true);
                                        if(Appointment.isPresent()){
                                                var Appointment_section = results[i].element(by.xpath('//app-time-slot-info'));
                                                expect(Appointment_section.isPresent()).toBe(true);
                                        };
                                }
                        });
                };



                //11 Click the „Show more“-Button
                var results_num_before_click = search_results.count();
                var show_more = element(by.xpath('//a[@angularticsaction="Load more results"]'));
                show_more.click();
                browser.driver.sleep(3000);
                var more_search_results = element.all(by.xpath('//app-contact-card'));
                var results_num_after_click = more_search_results.count();

                //Additional results are loaded
                expect(results_num_after_click >= results_num_before_click).toBe(true);


                //12 enter valid data into the „Location“-Inputfield
                var test_Location_input = '56567';
                Location_Input_field.sendKeys(test_Location_input);
                browser.driver.sleep(2000);
                //A dropdown is opened with fitting suggestions according to the entered value
                if(dropdown.isPresent()){
                        var Location_results = element.all(by.xpath('//typeahead-container/button/div[@class="dropdown-item-container ng-star-inserted"]'));
                        Location_results.then(function(results){
                                for(var i =0; i<Location_results.length; i++)
                                {
                                        expect(results[i].getText()).toContain(Location_results); 
                                        
                                }
                        });

                };

        

                //13 Select an entry from the suggestions and click on the „Search-Button“
                var entry_from_suggestion = element(by.xpath('//*[@id="search"]/div/div[2]/div[2]/div[1]/app-filter/div/div/div/div[2]/div/div/div[1]/typeahead-container/button[2]'));
                entry_from_suggestion.click();
                Search_Button.click();
                browser.driver.sleep(3000);

                //The search results are refined now, regarding the entered location, in the results now also the distance to the entered location is displayed
                var search_results_with_name_and_location = element.all(by.xpath('//app-contact-card'));
                if(search_results_with_name_and_location.isPresent()){
                        search_results_with_name_and_location.then(function(results){
                                for(var i=0;i<search_results_with_name_and_location.length;i++)
                                {
                                        var address = results[i].element(by.xpath('//app-address-link-text/a/p[2]'))
                                        //Get the first and second digits of the zip code
                                        var Distance_verification = address.slice(0,1);
                                        //Get the first and second digits of the Location
                                        var Location_verification = test_Location_input(0,1);
                                        //The first two digits of the zip code are the same, the distance is not far
                                        expect(Distance_verification == Location_verification).toBe(true);
                                }
                        });
                };


                //14 Check the „Online Bookable“-Checkbox

                browser.actions().mouseMove(Online_Bookable_Checkbox).click().perform();
                var timeframe = element(by.xpath('//app-filter')).element(by.className('row onlineBooking no-gutters ng-star-inserted'));
                //Additionally dropdown and inputfield for timeframe definition is displayed
                expect(timeframe.isPresent()).toBe(true);
        

                //15 Click the „Search-Button“ again
                Search_Button.click();
                browser.driver.sleep(3000);
                var online_bookable_results = element.all(by.xpath('//app-contact-card'));
                if(online_bookable_results.isPresent())
                        {
                                online_bookable_results.then(function(results){
                                        for(var i = 0; i < results.length; i++){
                                                var Appointment = results[i].element(by.xpath('//app-contact-slots-details'));
                                                //only physicians with online bookable appointments are displayed
                                                expect(Appointment.isPresent()).toBe(true);
                                        }
                                });
                                
                                

                        };
        });
        


        it('Check „Video-Conference“,„Barrier-Free“-Checkbox,',function(){
                //16 Check „Video-Conference“-Checkbox, empty the "Name" inputfield and click the „Search Button“ again
                browser.get('https://demo.clickdoc.de/cd-de/search');
                browser.driver.sleep(2000);
                Name_Input_field.sendKeys('Dr. med. Elvira Elver');
                browser.actions().mouseMove(Videoconference_Checkbox).click().perform();
                Search_Button.click();
                browser.driver.sleep(2000);

                var Video_Conference_results = element.all(by.xpath('//app-contact-card'));
                if(Video_Conference_results.isPresent()){
                        Video_Conference_results.then(function(results){
                                for(var i = 0; i<results.length; i++){
                                        var video_icon = results[i].element(by.xpath('//app-contact-details')).element(by.className('icon icon-CH_video'));
                                        //only physicians providing video-conference treatments are displayed
                                        expect(video_icon.isPresent()).toBe(true);
                                }
                        });
                };



                //17 Uncheck „Video-Conference“ Checkbox again, check „Barrier-Free“ Checkbox and click search again
                Name_Input_field.clear();
                Name_Input_field.sendKeys('Dr. Peter Time');
                browser.actions().mouseMove(Videoconference_Checkbox).click().perform();
                browser.actions().mouseMove(Barrier_Free_Checkbox).click().perform();
                Search_Button.click();
                browser.driver.sleep(2000);

                var barrier_results = element.all(by.xpath('//app-contact-card'));
                if(barrier_results.isPresent()){
                        barrier_results.then(function(results){
                                for(var i = 0; i<results.length; i++){
                                        var barrier_free_icon = results[i].element(by.xpath('//app-contact-details')).element(by.className('icon icon-AT_handicap'));
                                        //only physicians with barrier-free state are displayed
                                        expect(barrier_free_icon.isPresent()).toBe(true);
                                }
                        });
                };
        });

        
        
        it('Check the „Alphabetical-Sort“ option A-Z',function(){
                //18 Check the „Alphabetical-Sort“ option A-Z in the sorting section
                browser.get('https://demo.clickdoc.de/cd-de/search');
                browser.driver.sleep(2000);
                Name_Input_field.sendKeys(test_name);
                
                Search_Button.click();
                browser.driver.sleep(3000);
                browser.actions().mouseMove(Alphabetical_Names_Checkbox).click().perform();
                
                browser.driver.sleep(3000);
                //search results are sorted alphabetically be the physicians lastname
                var target_sorted = [] , current_sorted = [];
                var Doctor_Name = element.all(by.xpath('//app-contact-header//h2'));
                Doctor_Name.each(function(eachName){
                        eachName.getText().then(function(name){
                                var i = 0;
                                current_sorted[i] = name.split(" ")[name.length-1];
                                i++;
                        });
                }).then(function(){
                        //check sorting
                        target_sorted = current_sorted.slice();
                        target_sorted.sort(); //use sort function of Javascript
                        expect(target_sorted).toEqual(current_sorted);
                });

        });

        it('Check the „Alphabetical-Sort“ option Z-A',function(){
                //19 Check the „Alphabetical-Sort“ option Z-A in the sorting section
                browser.get('https://demo.clickdoc.de/cd-de/search');
                browser.driver.sleep(2000);
                Name_Input_field.sendKeys(test_name);
                var z_a_radio = element(by.id('descending'));
                Search_Button.click();
                browser.driver.sleep(3000);
                browser.actions().mouseMove(Alphabetical_Names_Checkbox).click().perform();
                browser.driver.sleep(500);
                browser.actions().mouseMove(z_a_radio).click().perform();
                
                browser.driver.sleep(3000);
                //search results are sorted alphabetically be the physicians lastname
                var target = [] , current = [];
                var Doctor_Name = element.all(by.xpath('//app-contact-header//h2'));
                Doctor_Name.each(function(eachName){
                        eachName.getText().then(function(name){
                                var i = 0;
                                current[i] = name.split(" ")[name.length-1];
                                i++;
                        });
                }).then(function(){
                        //check sorting
                        target = current.slice();
                        target.reverse(); //use sort function of Javascript
                        expect(target).toEqual(current);
                });

        });
        
        it('check range slider',function(){
                browser.get('https://demo.clickdoc.de/cd-de/search');
                browser.driver.sleep(2000);
                Name_Input_field.sendKeys(test_name);
                Location_Input_field.sendKeys('56070');
                Search_Button.click();
                browser.driver.sleep(3000);

                var results_before_drag = element.all(by.xpath('//app-contact-card//h2'));
                var doctor_names_before_drag = [];
                results_before_drag.each(function(eachName){
                        eachName.getText().then(function(name){
                                var i = 0;
                                doctor_names_before_drag[i] = name;
                                i++;
                        });
                });
                //19 Drag range slider without releasing it

                var position = element(by.xpath('//*[@id="search"]/div/div[2]/div[2]/div[2]/app-sort/div/div/div[4]/div/div/ng5-slider/span[12]/span[1]/ng5-slider-tooltip-wrapper'));
                
                var range_radio = element(by.xpath('//ng5-slider/span[5]'));

                
                var range_forward = {x: 49, y: 0};
                var range_back = {x: -49, y: 0};
                

                browser.actions().mouseDown(range_radio).mouseMove(range_forward )
                .mouseMove(range_forward )
                .mouseMove(range_forward )
                .mouseMove(range_back )
                .mouseMove(range_back )
                .mouseMove(range_forward )
                .perform();
                browser.driver.sleep(3000);

                var results_after_drag = element.all(by.xpath('//app-contact-card//h2'));
                var doctor_names_after_drag = [];
                results_after_drag.each(function(eachName){
                        eachName.getText().then(function(name){
                                var i = 0;
                                doctor_names_after_drag[i] = name;
                                i++;
                        });
                });
                

                //Search results are not newly sorted

                expect(doctor_names_before_drag).toEqual(doctor_names_after_drag);
               

                //20 Release dragging of slider
                browser.actions().mouseDown(range_radio)
                .mouseMove(range_back)
                .mouseMove(range_back)
                .mouseMove(range_back).mouseUp().perform();

                browser.driver.sleep(3000);
                //resultsa are now newly sorted according to distance range provided
                var location_results_after_drop = element.all(by.xpath('//app-contact-details/div/app-profile-field[2]/div/div[2]/app-address-link-text/a/p[2]'));
                location_results_after_drop.each(function(eachAddress){
                        eachAddress.getText().then(function(address){
                                expect(address).toContain('56070'); //the range is 1km, which means the zip must be 56070
                        });
                });



                


        });


        


        



});