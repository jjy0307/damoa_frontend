function tag_filter_change(tag) {
    const filter = tag.value
    const communitys = document.getElementsByClassName("main-community")
    for (i=0; i<communitys.length; i++) {
        const community = communitys[i]
        const community_tags = community.children[1].children[2].children
        if (filter === '전체') {
            community.setAttribute('style', 'display:flex');
        } else {
            if (community_tags.length > 0) {
                for (j=0; j<community_tags.length; j++) {
                    const community_tag = community_tags[j].innerHTML.split('# ')[1]
                    if (filter === community_tag) {
                        community.setAttribute('style', 'display:flex');
                        break;
                    } else {
                        community.setAttribute('style', 'display:none');
                    }
                }
            } else {
                community.setAttribute('style', 'display:none');
            }
            
        }
    }
}

function modal_show() {
    document.querySelector('.main-community-modal__background').className = 'main-community-modal__background main-community-modal__show';
}

function modal_close() {
    document.querySelector('.main-community-modal__background').className = 'main-community-modal__background';
}

document.querySelector('#make_community').addEventListener('click', modal_show);
document.querySelector('#modal_close').addEventListener('click', modal_close);
