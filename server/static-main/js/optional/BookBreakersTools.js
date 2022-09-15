
function toPct(odds,type='Am'){
    odds = parseFloat(odds)
    if(type=='Dec'){
        return 1/odds
    }
    if(type=='Am'){
        if(odds > 0){
            return (100/(odds + 100))
        }else{
            return (-odds/(-odds + 100))
        }
    }
    if(type=='Pct'){
        return odds
    }
}

function fromPct(odds,type='Am'){
    if(type=='Dec'){
        return 1/odds
    }
    if(type=='Am'){
        if(odds < 0.5){
            return (100*(1-odds)/odds)
        }else{
            return (-100*(odds/(1-odds)))
        }
    }
    if(type=='Pct'){
        return odds
    }
}

function toDec(odds,type='Am'){
    return fromPct(toPct(odds,type),'Dec')
}
function toAm(odds,type='Dec'){
    return fromPct(toPct(odds,type),'Am')
}

function oddsFormat(odds,type='Am'){
    if (type == 'Am'){
        if (odds == null){
            return 'None'
        }else{
            odds = odds.toFixed(0)
            return (odds<0?"":"+") + odds
        }
    }else if (type == 'Dec'){
        if (odds == null){
            return 'None'
        }else{
            odds = odds.toFixed(3)
            return (odds<0?"":"+") + odds
        }
    }
}

function vigcalc(changevar,event){
    if (event.keyCode == 9){
        return
    }
    var table = document.getElementById("vigtable");
    var tot = 0
    var ot = document.querySelector('input[name="odds-type"]:checked').value;
    if(ot == 'Dec'){
        var addsf = 2;
    }else{
        var addsf = 0;
    }
    if(changevar == 'vl'|| changevar =='ur'){
        for (var i = 1, row; row = table.rows[i]; i++) {
            var ur = row.querySelector('input[name="use-row"]')
            if(ur.checked == true){
                var vl = row.querySelector('input[name="vig-line"]')
                tot += toPct(parseFloat(vl.value),ot)
            }
        }
        var vig = (tot-1)/tot
    }else{
        row = table.rows[1]
        var vig = parseFloat(row.querySelector('input[name="vig"]').value.replace(/[^\d.-]/g, ''))/100
    }
    
    // Adjusting for incorrect vig free lines 
    var totadjust = 0
    if(changevar == 'vf'){
        for (var i = 1, row; row = table.rows[i]; i++) {
            var ur = row.querySelector('input[name="use-row"]')
            if(ur.checked == true){
                var vl = row.querySelector('input[name="vig-free"]')
                totadjust += toPct(parseFloat(vl.value),ot)
            }
        }
        var vfadjust = (tot-1)/tot
    }

    for (var i = 1, row; row = table.rows[i]; i++) {
        var ur = row.querySelector('input[name="use-row"]')
        if(ur.checked == true){
            var vl = row.querySelector('input[name="vig-line"]')
            var vf = row.querySelector('input[name="vig-free"]')
            var wp = row.querySelector('input[name="win-pct"]')
            var vg = row.querySelector('input[name="vig"]')
            var tot = (1/(1-vig))
            if(changevar == 'vl'){  
                var pct = toPct(parseFloat(vl.value),ot)/tot
                wp.value = (pct*100).toFixed(2) + '%'
                vf.value = fromPct(pct,ot).toFixed(0+addsf)
                vg.value = (vig*100).toFixed(2) + '%'

                vl.parentNode.classList.remove("calculated");
                vf.parentNode.classList.add("calculated");
                wp.parentNode.classList.add("calculated");
                vg.parentNode.classList.add("calculated");
                vl.parentNode.classList.add("independent");
                vf.parentNode.classList.remove("independent");
                wp.parentNode.classList.remove("independent");
                vg.parentNode.classList.remove("independent");
            }else if(changevar == 'vg'){
                var pct = toPct(parseFloat(vf.value),ot)/tot
                wp.value = pct.toFixed(1)
                vl.value = fromPct(pct,ot).toFixed(0+addsf)
                if (i != 1){vg.value = (vig*100).toFixed(2)}
                

                vl.parentNode.classList.add("calculated");
                vf.parentNode.classList.remove("calculated");
                wp.parentNode.classList.add("calculated");
                vg.parentNode.classList.remove("calculated");
                vl.parentNode.classList.remove("independent");
                vf.parentNode.classList.add("independent");
                wp.parentNode.classList.remove("independent");
                vg.parentNode.classList.add("independent");
            }else if(changevar == 'vf'){
                var pct = toPct(parseFloat(vf.value),ot)/totadjust
                wp.value = (pct*100).toFixed(2) + '%'
                vl.value = fromPct(pct*tot,ot).toFixed(0+addsf)

                vl.parentNode.classList.add("calculated");
                vf.parentNode.classList.remove("calculated");
                wp.parentNode.classList.add("calculated");
                vg.parentNode.classList.remove("calculated");
                vl.parentNode.classList.remove("independent");
                vf.parentNode.classList.add("independent");
                wp.parentNode.classList.remove("independent");
                vg.parentNode.classList.add("independent");
            }else if(changevar == 'wp'){
                var pct = parseFloat(wp.value)/100
                vf.value = fromPct(pct,ot).toFixed(0+addsf)
                vl.value = fromPct((pct*tot),ot).toFixed(0+addsf)

                vl.parentNode.classList.add("calculated");
                vf.parentNode.classList.add("calculated");
                wp.parentNode.classList.remove("calculated");
                vg.parentNode.classList.remove("calculated");
                vl.parentNode.classList.remove("independent");
                vf.parentNode.classList.remove("independent");
                wp.parentNode.classList.add("independent");
                vg.parentNode.classList.add("independent");
            }
        } 
    }
}

function addvigrow(changevar){
    var table = document.getElementById("vigtable");
    var row = table.insertRow(-1);
    row.innerHTML += `<tr>
        <td class="vtd"><input type="checkbox" onclick="vigcalc('ur',event)" name="use-row" checked style="height:100%;width:100%"></td>
        <td class="vtd"><input type="text" onkeyup="vigcalc('vl',event)" name="vig-line" class="fillcell vinput"></td>
        <td class="vtd"><input type="text" onkeyup="vigcalc('vf',event)" name="vig-free" class="fillcell vinput"></td>
        <td class="vtd"><input type="text" onkeyup="vigcalc('wp',event)" name="win-pct" class="fillcell vinput"></td>
        <td class="vtd"><input type="text" onkeyup="vigcalc('vg',event)" name="vig" class="fillcell vinput" disabled></td>
    </tr>`
}


function kellyCalc(it,event){
    if (event.keyCode == 9){
        return
    }
    var kform = document.getElementById("kelly");

    var f = kform.querySelector('input[name="f"]')
    var p = kform.querySelector('input[name="p"]')
    var e = kform.querySelector('input[name="e"]')
    var dec = kform.querySelector('input[name="Dec"]')
    var am = kform.querySelector('input[name="Am"]')
    var k = kform.querySelector('input[name="k"]')
    var bankroll = kform.querySelector('input[name="bankroll"]')
    var wager = kform.querySelector('input[name="wager"]')

    var tdec = parseFloat(dec.value)
    if(it == 'Am' && am.value != ""){
        var xx = toPct(am.value,'Am')
        xx = fromPct(xx,'Dec')
        var tdec = xx
        dec.value=xx.toFixed(3)
    }else if(it == 'Dec' && dec.value != ""){
        var xx = toPct(dec.value,'Dec')
        xx = fromPct(xx,'Am')
        am.value=xx.toFixed(0)
    }
    
    if(['p','Dec','Am'].includes(it) && p.value != ""){
        xx = toPct(tdec,'Dec')
        var pval = parseFloat(p.value.replace(/[^\d.-]/g, ''))/100
        e.value = (((pval/xx)-1)*100).toFixed(3)
    }else if(['e','Dec','Am'].includes(it) && e.value != "" && dec.value != ""){
        xx = toPct(tdec,'Dec')
        console.log(xx)
        var edec = parseFloat(e.value.replace(/[^\d.-]/g, ''))/100
        p.value = (xx*(1+edec)*100).toFixed(3) + '%'
    }

    if (k != null){
        if (dec.value != "" && p!="" && k!="" && it != 'f'){
            pval = parseFloat(p.value.replace(/[^\d.-]/g, ''))/100
            bval = tdec-1
            kval = parseFloat(k.value.replace(/[^\d.-]/g, ''))
            f.value = (((pval-((1-pval)/bval))*kval)*100).toFixed(2)
        }

        if(f.value != "" && bankroll.value != "" && it != 'wager'){
            wager.value = (parseFloat(bankroll.value.replace(/[^\d.-]/g, ''))*parseFloat(f.value.replace(/[^\d.-]/g, ''))/100).toFixed(2)
        }else if(f.value != "" && wager.value !=""){
            bankroll.value = (parseFloat(wager.value.replace(/[^\d.-]/g, ''))/parseFloat(f.value.replace(/[^\d.-]/g, ''))*100).toFixed(2)
        }
    }else{
        var bet = kform.querySelector('input[name="bet"]')
        var win = kform.querySelector('input[name="win"]')
        if (e.value != "" && bet.value != ""){
            win.value = ((parseFloat(e.value.replace(/[^\d.-]/g, ''))/100)*(parseFloat(bet.value.replace(/[^\d.-]/g, '')))).toFixed(2)
        }
    }
    


}

function oddsConv(it,event){
    if (event.keyCode == 9){
        return
    }
    var oform = document.getElementById("odds-convert");

    var am = oform.querySelector('input[name="Am"]')
    var dec = oform.querySelector('input[name="Dec"]')
    var pct = oform.querySelector('input[name="pct"]')

    if(it=='Am'){
        x = toPct(parseFloat(am.value.replace(/[^\d.-]/g, '')),'Am')
        pct.value = (x*100).toFixed(2) + '%'
        dec.value = (fromPct(x,'Dec')).toFixed(3)
    }else if (it =='Dec'){
        x = toPct(parseFloat(dec.value.replace(/[^\d.-]/g, '')),'Dec')
        am.value = (fromPct(x,'Am')).toFixed(1)
        pct.value = (x*100).toFixed(2) + '%'
    }else{
        x = parseFloat(pct.value.replace(/[^\d.-]/g, ''))/100
        am.value = (fromPct(x,'Am')).toFixed(1)
        dec.value = (fromPct(x,'Dec')).toFixed(3)
    }
}