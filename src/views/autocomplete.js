$(document).ready(function() {
	$("#autocomplete").on('keyup', function() {
		$.post(("/users/search/?autocomplete=" + $("#autocomplete").val()), function(results) {
			$("#searchResults").html("<ul>");
			for (result in results) {
				if ($('#autocomplete').val() === "") {} else {
					$("#searchResults").append("<li>" + results[result] + "</li>");
				}
			}
		})
	})
});
$("#lastautocomplete").on('keyup', function() {
	$.post(("/users/search/?lastautocomplete=" + $("#lastautocomplete").val()), function(results) {
		$("#searchResults").html("");
		for (result in results) {
			if ($('#lastautocomplete').val() === "") {} else {
				$("#searchResults").append("<li>" + results[result] + "</li>");
			}
		}
	})
})