function tag_filter_change(tag) {
    const filter = tag.value
    const communitys = document.getElementsByClassName("main-community")
    for (i=0; i<communitys.length; i++) {
        const community = communitys[i]
        const community_tags = community.children[1].children[2].children
        if (filter === '전체') {
            community.setAttribute('style', 'display:flex');
        } else {
            for (j=0; j<community_tags.length; j++) {
                const community_tag = community_tags[j].innerHTML.split('# ')[1]
                if (filter === community_tag) {
                    community.setAttribute('style', 'display:flex');
                    break;
                } else {
                    community.setAttribute('style', 'display:none');
                }
            }
        }
    }
}