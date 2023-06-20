window.addEventListener("load", () => {
    const btn = document.getElementById("button_join");
    btn.addEventListener("click", event => {
        const in1 = document.getElementById("input1");
        const in2 = document.getElementById("input2");
        const out1 = document.getElementById("output1");
        const out2 = document.getElementById("output2");

        // outer joinして値を設定
        [out1.value, out2.value] = do_outer_join(in1.value, in2.value);
    });
})

function preprocessing(s){
    // 改行で配列
    const ary_in = s.split(/\n/);

    // 空を削除
    const ary_filter = ary_in.filter(function(e){return e!==""})

    // 重複を削除
    const set_s = new Set(ary_filter);
    const ary_no_dup = [...set_s];

    // ソート
    return ary_no_dup.sort();
}

function do_outer_join(s1, s2){
    // 前処理
    const s1_ary = preprocessing(s1);
    const s2_ary = preprocessing(s2);

    // ２つの配列を比較しながらret_ary1, 2を作成
    // ret_ary1は1-line、ret_ary2は2-lines
    let ret_ary1=[], ret_ary2=[];
    let i=0, j=0;
    while((i < s1_ary.length) && (j < s2_ary.length)){
        if (s1_ary[i] < s2_ary[j]) {
            ret_ary1.push(s1_ary[i]);
            ret_ary2.push(s1_ary[i] + "\t");
            i++;
        } else if (s1_ary[i] > s2_ary[j]) {
            ret_ary1.push(s2_ary[j]);
            ret_ary2.push("\t" + s2_ary[j]);
            j++;
        } else {
            // 同じ値
            ret_ary1.push(s1_ary[i]);
            ret_ary2.push(s1_ary[i] + "\t" + s2_ary[j]);
            i++;
            j++;
        }
    }
    // 余った分を追加（多くともi, jのどちらかしか動かないはず）
    for(ii=i; ii<s1_ary.length; ii++){
        ret_ary1.push(s1_ary[ii]);
        ret_ary2.push(s1_ary[ii] + "\t");
    }
    for(jj=j; jj<s2_ary.length; jj++){
        ret_ary1.push(s2_ary[jj]);
        ret_ary2.push("\t" + s2_ary[jj]);
    }
    
    // 改行で結合して返す
    return [ret_ary1.join("\n"), ret_ary2.join("\n")];
}
