function updateCount() {

    var itemsToPack = $('#packingList li').not('.packed').length;
    var itemText = itemsToPack === 1 ? itemsToPack + " item" : itemsToPack + " items";
    $('#itemSummary span').html(itemText);
    totalListItems = $('#packingList li').length;

    if (totalListItems > 0) {
        $('#itemSummary button').fadeIn();
    } else {
        $('#itemSummary button').fadeOut();
    }
}

$('#packingForm').on('submit', function (e) {
   
    e.preventDefault();
    var itemText = $('#newItemDescription').val();
    $('#newItemDescription').val('');

    var newListItem = '<li><input type="checkbox"><span class="item">' + itemText + '</span><a href="#" class="edit">Edit</a><a href="#" class="remove">Remove</a></li>';

    $('#packingList').append(newListItem);
    updateCount();
});


$('#packingList').on('change', 'input[type="checkbox"]', function () {
    $(this).parent().toggleClass('packed');
    updateCount();
});


$('#packingList').on('click', '.remove', function (e) {
    e.preventDefault();
    $(this).parent().remove();
    updateCount();
});

$('#packingList').on('click', '.edit', function (e) {
    e.preventDefault();
    var itemText = $(this).siblings('.item').text();

    $(this).parent().html('<form id="editor"><input type="text" value="' + itemText + '"><button type="submit" class="btn">Save</button></form>');
});


$('#packingList').on('submit', '#editor', function (e) {
    e.preventDefault();
    var itemText = $(this).find('input').val();

    var newListItem = '<input type="checkbox"><span class="item">' + itemText + '</span><a href="#" class="edit">Edit</a><a href="#" class="remove">Remove</a>';

    $(this).parent().html(newListItem);    
});


$('#deleteItems').on('click', function () {
    $('#packingList').empty();
    updateCount();
});


$('#clearPacked').on('click', function () {
    $('.packed').remove();
    updateCount();
});