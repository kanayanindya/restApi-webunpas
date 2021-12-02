function searchMovie(){
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',  // sumber api
        type: 'get',                // methodnya apa
        dataType: 'json',           // data kembaliannya mau apa
        data: {
            'apikey': 'cfe14560',
            's': $('#search-input').val(),
        },
        success: function(result){
            if(result.Response == "True") {
                let movies =  result.Search;
                $.each(movies, function(i, data){
                    $('#movie-list').append(`

                    <div class="col-md-4">

                    <div class="card">
                    <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">`+ data.Title+`</h5>
                      <h6 class="card-subtitle mb-2 text-muted">`+ data.Year+`</h6>
                      <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id ="`+data.imdbID+`">See Details</a>
                    </div>
                  </div>
                  </div>
                    `);
                });

                $('#search-input').val('');

            }else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error+ `</h1> 
                
                `)
            }
        },

    });
}



$('#search-button').on('click',function () {
    searchMovie();
});

$('#search-input').on('keyup', function(even){
    if(even.which === 13){
        searchMovie();
    }
})


$('#movie-list').on('click','.see-detail', function(){     //event binding , ada di playlist DOM
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'cfe14560',
            'i': $(this).data('id')    // this adalah tombol see detail yg sedang sy klik
        },
        success: function(movie){
            if(movie.Response === "True"){

                $('.modal-body').html(`
                    <div class = "container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src = "`+ movie.Poster+`" class    ="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                                    <li class="list-group-item"><h3> Released : `+movie.Released+`</h3></li>
                                    <li class="list-group-item"><h3> Genre : `+movie.Genre+`</h3></li>
                                    <li class="list-group-item"><h3> Actor : `+movie.Actors+`</h3></li>
                                    <li class="list-group-item"><h3> Director : `+movie.Director+`</h3></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                
                `);


            }
        }
    })
})
