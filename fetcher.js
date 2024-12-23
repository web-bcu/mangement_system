export const getFetcher = (url) => {
    return fetch(url)
      .then((res) => res.json());
  };
  

export const postFetcher = async (url, payload) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error('Failed to post data');
    }
  
    return response.json();
  };
  export const deleteFetcher = async (url) => {
    const response = await fetch(url, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete data');
    }
  
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();  
    }
  
    const text = await response.text();
    return { message: text };
  };
  
  export const updateFetcher = async (url, payload) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update data');
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();  
    }
  
    const text = await response.text();
    return { message: text };
  };
  