
var url = 'http://getbible.net/json',
  timer;

$('#datepicker').datepicker();

$('form').submit(function(e){
  e.preventDefault();
});

$('#find_ref').keydown(function(e) {
  console.log('keydown');
  console.log(e.keyCode);
  clearTimeout(timer);
  if(e.keyCode == 13){
    this.blur();
  }
});

$('#find_ref').keyup(function(e) {
  timer = setTimeout(function(e) {
    var ref = $('#find_ref').val();
    var ref = ref.replace(/\s/g, '');
    console.log(ref);
    lookUp(ref);
  }, 800);

});

function lookUp(ref) {
  $.ajax({
    url: url,
    dataType: 'jsonp',
    data: 'p=' + ref + '&v=nasb',
    jsonp: 'getbible',
    success: function(json) {
      console.log(json.type);
      var output = '';
      if (json.type == 'chapter') {
        $.each(json.chapter, function(index, value) {
          output += '<small style="font-weight: bold;">' + value.verse_nr + '</small>' + " " + value.verse + " ";
        });
      } else {
        $.each(json.book, function(index, value) {
          $.each(value.chapter, function(index, value) {
            output += '<small style="font-weight: bold;">' + value.verse_nr + '</small>' + " " + value.verse + " ";
          });
        });
      }
    
      $("#passage").html(output);
    },
    error: function(json, error) {
      $('#passage').html('<h2>No scripture was returned, please try again!</h2>');
    }
  });
}
