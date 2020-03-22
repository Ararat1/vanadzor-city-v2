$(document).ready(() => {

    /* PAGE NAVIGATION
     *************/
    $('a[data-target^="anchor"]').bind('click.smoothscroll', function () {
        let target = $(this).attr('href'),
            bl_top = $(target).offset().top;
        $('body, html').animate({
            scrollTop: bl_top
        }, 700);
        return false;
    });

    /* GALLERY
     *************/
    // saving galler id in the session storages
    let isActive_id = +sessionStorage.getItem('galleryId');

    if (isActive_id !== null && typeof isActive_id === 'number') {
        activateGallery(isActive_id);
    }

    function activateGallery(id) {
        sessionStorage.setItem('galleryId', id);

        let sliderElement = $('section#gallery .slider');

        let slides = createSlides(id);

        clearSliderElement(sliderElement);

        addSlides(sliderElement, slides);

        activateSlider(sliderElement);

        return true;
    }

    function createSlides(id) {
        let galleryImages = [ // Sources of the images
            [ // Grigor Narekatsi church [0]
                "images/gallery/churchOfGrigorNarekatsi/0.jpg",
                "images/gallery/churchOfGrigorNarekatsi/1.jpg",
                "images/gallery/churchOfGrigorNarekatsi/2.jpg",
                "images/gallery/churchOfGrigorNarekatsi/3.jpg",
                "images/gallery/churchOfGrigorNarekatsi/4.jpg",
                "images/gallery/churchOfGrigorNarekatsi/5.jpg",
                "images/gallery/churchOfGrigorNarekatsi/6.jpg",
            ],
            [ // Black church [1]
                "images/gallery/blackChurch/0.jpg",
                "images/gallery/blackChurch/1.jpg",
                "images/gallery/blackChurch/2.jpg",
                "images/gallery/blackChurch/3.jpg",
                "images/gallery/blackChurch/4.jpg",
                "images/gallery/blackChurch/5.jpg",
                "images/gallery/blackChurch/6.jpg",
                "images/gallery/blackChurch/7.jpg",
                "images/gallery/blackChurch/8.jpg",
                "images/gallery/blackChurch/9.jpg",
                "images/gallery/blackChurch/10.jpg",
            ],
            [ // The city [2]
                "images/gallery/city/0.jpg",
                "images/gallery/city/1.jpg",
                "images/gallery/city/2.jpg",
                "images/gallery/city/3.jpg",
                "images/gallery/city/4.jpg",
                "images/gallery/city/5.jpg",
                "images/gallery/city/6.jpg",
                "images/gallery/city/7.jpg",
                "images/gallery/city/8.jpg",
                "images/gallery/city/9.jpg",
                "images/gallery/city/10.jpg",
                "images/gallery/city/11.jpg",
                "images/gallery/city/12.jpg",
                "images/gallery/city/13.jpg",
                "images/gallery/city/14.jpg",
                "images/gallery/city/15.jpg",
                "images/gallery/city/16.jpg",
                "images/gallery/city/17.jpg",
                "images/gallery/city/18.jpg",
                "images/gallery/city/19.jpg",
            ],
            [ // The city park [3]
                "images/gallery/cityPark/0.jpg",
                "images/gallery/cityPark/1.jpg",
                "images/gallery/cityPark/2.jpg",
                "images/gallery/cityPark/3.jpg",
                "images/gallery/cityPark/4.jpg",
                "images/gallery/cityPark/5.jpg",
                "images/gallery/cityPark/6.jpg",
                "images/gallery/cityPark/7.jpg",
                "images/gallery/cityPark/8.jpg",
                "images/gallery/cityPark/9.jpg",
                "images/gallery/cityPark/10.jpg",
                "images/gallery/cityPark/11.jpg",
                "images/gallery/cityPark/12.jpg",
                "images/gallery/cityPark/13.jpg",
                "images/gallery/cityPark/14.jpg",
                "images/gallery/cityPark/15.jpg",
                "images/gallery/cityPark/16.jpg",
            ],
            [ // Nature [4]
                "images/gallery/nature/0.jpg",
                "images/gallery/nature/1.jpg",
                "images/gallery/nature/2.jpg",
                "images/gallery/nature/3.jpg",
                "images/gallery/nature/4.jpg",
                "images/gallery/nature/5.jpg",
                "images/gallery/nature/6.jpg",
                "images/gallery/nature/7.jpg",
                "images/gallery/nature/8.jpg",
                "images/gallery/nature/9.jpg",
                "images/gallery/nature/10.jpg",
                "images/gallery/nature/11.jpg",
                "images/gallery/nature/12.jpg",
            ]
        ];
        galleryImages = galleryImages.filter((item, index) => index === id);
        galleryImages = galleryImages[0];

        let fragmentOfSlides = document.createDocumentFragment();

        for (let i = 0; i < galleryImages.length; i++) {
            let div = document.createElement('div'),
                img = document.createElement('img');

            div.classList.add('slide');
            img.src = galleryImages[i];
            img.alt = `image ${i} of ${galleryImages.length}`;
            img.title = "gallery-image";

            div.appendChild(img);
            fragmentOfSlides.appendChild(div);
        }

        return fragmentOfSlides;


    }

    function clearSliderElement(sliderElement) {
        sliderElement.removeClass()
        sliderElement.addClass('slider')
        sliderElement.empty();

        return true;
    }

    function addSlides(sliderElement, fragment) {
        sliderElement.append(fragment);

        return true;
    }

    function activateSlider(sliderBlock) {
        sliderBlock.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('section#gallery button.arrow-prev'),
            nextArrow: $('section#gallery button.arrow-next'),
        });

        return true;
    }

    // GALLERY MODAL WINDOW CLOSE EVENT
    $('section#gallery button.close-btn').on('click', event => {
        let galleryElement = $('section#gallery');
        clearSliderElement(galleryElement.find('.slider'));
        galleryElement.removeClass('active');

    });

    // GET GALLERY ID AND ACTIVATE THE GALLERY
    $("section#places").on('click', e => {
        let element = e.target;

        if (element.tagName === 'BUTTON') {
            $('section#gallery').addClass('active');
            activateGallery(+element.dataset.id); // "+": string => number
        }
    });

    /* FORM VALIDATING AND SENDING DATA
     **********************/
    $('section#contact .contact-form').on('submit', event => {
        event.preventDefault();

        const checkInputs = (nameInput, emailInput, messageInput) => {
            // DATA
            let name = nameInput.value.trim();
            let email = emailInput.value.trim();
            let message = messageInput.value.trim();

            let errorsCount = 0;

            let data = {};

            // FUNCTIONS
            function isEmail(email) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
            }

            // CHECKING
            // name input checking
            if (name === '') {
                nameInput.classList.add('error');
                errorsCount++;
            } else {
                data.name = name;
                nameInput.classList.remove('error');
            }

            // email input checking
            if (isEmail(email) === false) {
                emailInput.classList.add('error');
                errorsCount++;
            } else {
                data.email = email;
                emailInput.classList.remove('error');
            }

            // message area checking
            if (message === '') {
                messageInput.classList.add('error');
                errorsCount++;
            } else {
                data.message = message;
                messageInput.classList.remove('error');
            }

            // returning data
            if (errorsCount === 0) {
                return data;
            }

            return false;
        };

        let form = event.target,
            nameInput = form['name'],
            emailInput = form['email'],
            messageInput = form['message'];

        let checkingResult = checkInputs(nameInput, emailInput, messageInput); // {...} || false
        

        if (checkingResult != false) {
            let xhr = new XMLHttpRequest();
            let objToURL = $.param(checkingResult);

            xhr.open('GET', `http://vanadzorcity/php/data.php?${objToURL}`, true);

            xhr.send();

            form.reset();
        }

    });
});