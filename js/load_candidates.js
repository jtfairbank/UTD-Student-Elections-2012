/* Assumptions:
 *  - non-existant content is left blank
 *  - non-existant image locations are left blank or as ".jpg"
 *  - Each candidte has (at minimum):
 *      1. Name
 *      2. Position (they are running for)
 *      3. Biography
 */

$(function() {
    // setup a template for each article
    var article_template = $('<article class="candidate"></article>');
    var header = $('<header></header>').appendTo(article_template);
    $(header).append('<h1></h1>');
    var header_ul = $('<ul class="quick-info"></uL>').appendTo(header);
    $(header_ul).append("<li><strong>Position: </strong></li>")
                .append("<li></li>")
    var content = $('<div class="content"></div>').appendTo(article_template);
    $(content).append('<div class="img-wrapper"><img src="" alt="Candidate Image" /></div>')
              .append('<p class="bio"></p>')
              .append('<p class="contact"></p>');

    $.getJSON('js/ajax/candidates.js', function(candidates) {
        // candidates = an array of candidate objects
        for (var i = 0; i < candidates.length; i++) {
            var c = candidates[i];
            var article = $(article_template).clone( true, true ); // deep clone
            
            // setup header
            //  - image
            if ( c.img != "" && c.img != ".jpg" ) {
                $(article).find(".content img").attr( 'src',  'images/candidates/' + c.img ); // do img first so it can load; TODO does this actually work like that?
            } else {
                $(article).find(".content img").remove();
            }
            
            //  - name
            $(article).find("header h1").text( c.name );
            
            //  - position / dept
            if ( c.dept == "" ) { // sophomores don't have a department (others might not have listed theirs)
                c.dept = "&nbsp;";
            }
            $(article).find("header .quick-info > *:nth-child(2)").html( c.pos + "<br />" + c.dept );

            // setup body
            //  - bio
            $(article).find(".content .bio").text( c.bio );
            
            //  - email
            if ( c.email != "" ) {
                (article).find(".content .contact").html( 'You can contact ' + c.name.split(" ")[0] /* first name only */ + ' at <a href="mailto:' + c.email + '?Subject=SAVE UT Dallas">' + c.email + '</a>.');
            } else {
                $(article).find(".content .contact").remove();
            }

            // put in document
            $("#candidates .content-wrapper").append( article );
        }

        // odd # of candidates
        // add in an extra for asthetics
        if (candidates.length % 2 == 1) {
            $("#candidates .content-wrapper").append('<article class="candidate"><!--empty for display purposes- odd # candidates otherwise --></article>');
        }
    });
});
