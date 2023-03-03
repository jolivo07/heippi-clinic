const observation = document.getElementById('obs').addEventListener("click", ()=>{
    var element = document.getElementById('print');
    var opt = {
        margin:       1,
        filename:     'observation.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
      html2pdf(element, opt);
      console.log("pitnar")
})
