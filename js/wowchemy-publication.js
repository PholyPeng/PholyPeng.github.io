var a = {},
    c, r, l = $("#container-publications");
if (l.length) {
    l.isotope({
        itemSelector: ".isotope-item",
        percentPosition: !0,
        masonry: {
            columnWidth: ".grid-sizer"
        },
        filter: function() {
            let t = $(this),
                i = c ? t.text().match(c) : !0,
                o = r ? t.is(r) : !0;
            return i && o
        }
    });
    let e = $(".filter-search").keyup(p(function() {
        c = new RegExp(e.val(), "gi"), l.isotope()
    }));
    $(".pub-filters").on("change", function() {
        let i = $(this)[0].getAttribute("data-filter-group");
        if (a[i] = this.value, r = f(a), l.isotope(), i === "pubtype") {
            let o = $(this).val();
            o.substr(0, 9) === ".pubtype-" ? window.location.hash = o.substr(9) : window.location.hash = ""
        }
    })
}

function p(e, t) {
    let i;
    return t = t || 100,
        function() {
            clearTimeout(i);
            let u = arguments,
                n = this;

            function s() {
                e.apply(n, u)
            }
            i = setTimeout(s, t)
        }
}

function f(e) {
    let t = "";
    for (let i in e) t += e[i];
    return t
}

function d() {
    if (!l.length) return;
    let e = window.location.hash.replace("#", ""),
        t = "*";
    e != "" && !isNaN(e) && (t = ".pubtype-" + e);
    let i = "pubtype";
    a[i] = t, r = f(a), l.isotope(), $(".pubtype-select").val(t)
}
document.addEventListener("DOMContentLoaded", function() {
    $(".pub-filters-select") && d(), $(".js-cite-modal").click(function(e) {
        e.preventDefault();
        let t = $(this).attr("data-filename"),
            i = $("#modal");
        i.find(".modal-body code").load(t, function(o, u, n) {
            if (u == "error") {
                let s = "Error: ";
                $("#modal-error").html(s + n.status + " " + n.statusText)
            } else $(".js-download-cite").attr("href", t)
        }), i.modal("show")
    }), $(".js-copy-cite").click(function(e) {
        e.preventDefault();
        let t = document.querySelector("#modal .modal-body code").innerHTML;
        navigator.clipboard.writeText(t).then(function() {
            console.debug("Citation copied!")
        }).catch(function() {
            console.error("Citation copy failed!")
        })
    })
});