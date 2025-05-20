document.addEventListener('DOMContentLoaded', () => {

    function getHeaderOffset() {
        const header = document.getElementById('site-header');
        return header ? header.offsetHeight : 0;
    }


    function smoothScrollToElement(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const offset = getHeaderOffset();
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }


    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const hashIndex = href.indexOf('#');
    
            if (hashIndex === -1) return;
    
            const targetId = href.substring(hashIndex + 1);
            const isSamePage = !href.startsWith('http') && (href.startsWith('#') || href.startsWith('index.html#'));
    
            if (isSamePage) {
                e.preventDefault();
                smoothScrollToElement(targetId);
            }
        });
    });


    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        setTimeout(() => {
            smoothScrollToElement(targetId);
        }, 1000);
    }
});